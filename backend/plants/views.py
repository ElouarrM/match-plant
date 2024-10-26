from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser  # Ajout de ces imports
from django.contrib.auth import authenticate
from django.db.models import Count
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .models import Plant, UserPreference
from .serializers import (
    AdminLoginSerializer, 
    AdminUserSerializer, 
    PlantSerializer,
    UserPreferenceSerializer
)

class PlantViewSet(viewsets.ModelViewSet):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]  # Permission par défaut

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsAdminUser()]
        return [AllowAny()]

    def create(self, request, *args, **kwargs):
        try:
            print("Données reçues:", request.data)
            serializer = self.get_serializer(data=request.data)
            
            if serializer.is_valid():
                # Gestion de l'image
                if 'image' in request.FILES:
                    image = request.FILES['image']
                    path = default_storage.save(
                        f'plants/{image.name}',
                        ContentFile(image.read())
                    )
                    serializer.validated_data['image'] = path

                instance = serializer.save()
                return Response(
                    self.get_serializer(instance).data,
                    status=status.HTTP_201_CREATED
                )
            
            print("Erreurs de validation:", serializer.errors)
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print("Erreur:", str(e))
            return Response(
                {'detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class UserPreferenceViewSet(viewsets.ModelViewSet):
    queryset = UserPreference.objects.all()
    serializer_class = UserPreferenceSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
def get_recommendations(request):
    """
    Obtient des recommandations de plantes basées sur les préférences utilisateur
    """
    try:
        # Valider les données d'entrée
        space_type = request.data.get('space_type')
        light_level = request.data.get('light_level')
        maintenance_time = request.data.get('maintenance_time')
        experience_level = request.data.get('experience_level')

        # Construire la requête
        query = Plant.objects.all()

        # Filtrer par niveau de lumière
        if light_level:
            query = query.filter(light_requirement=light_level)

        # Filtrer par niveau d'entretien basé sur le temps disponible
        if maintenance_time:
            maintenance_time = int(maintenance_time)
            if maintenance_time <= 10:
                query = query.filter(maintenance_level='LOW')
            elif maintenance_time <= 20:
                query = query.filter(maintenance_level__in=['LOW', 'MEDIUM'])

        # Filtrer par niveau d'expérience
        if experience_level == 'BEGINNER':
            query = query.filter(maintenance_level='LOW')
        elif experience_level == 'INTERMEDIATE':
            query = query.filter(maintenance_level__in=['LOW', 'MEDIUM'])

        # Sauvegarder les préférences
        UserPreference.objects.create(
            space_type=space_type,
            light_level=light_level,
            maintenance_time=maintenance_time,
            experience_level=experience_level
        )

        # Sérialiser les résultats
        serializer = PlantSerializer(query, many=True)
        
        return Response({
            'recommendations': serializer.data,
            'filters_applied': {
                'space_type': space_type,
                'light_level': light_level,
                'maintenance_time': maintenance_time,
                'experience_level': experience_level
            }
        })

    except Exception as e:
        print("Erreur recommendations:", str(e))
        return Response(
            {'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
def admin_login(request):
    serializer = AdminLoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)
        
        if user is not None and user.is_staff:
            refresh = RefreshToken.for_user(user)
            user_serializer = AdminUserSerializer(user)
            
            return Response({
                'token': str(refresh.access_token),
                'user': user_serializer.data
            })
        
        return Response(
            {'error': 'Invalid credentials'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def get_dashboard_stats(request):
    try:
        total_plants = Plant.objects.count()
        total_recommendations = UserPreference.objects.count()
        
        popular_plants = Plant.objects.annotate(
            recommendation_count=Count('id')
        ).order_by('-recommendation_count')[:5]
        
        serializer = PlantSerializer(popular_plants, many=True)
        
        return Response({
            'total_plants': total_plants,
            'total_recommendations': total_recommendations,
            'popular_plants': serializer.data
        })
    except Exception as e:
        print("Erreur dashboard:", str(e))
        return Response(
            {'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )