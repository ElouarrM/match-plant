from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Plant, UserPreference

class PlantSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    image_url = serializers.URLField(required=False)

    class Meta:
        model = Plant
        fields = [
            'id', 
            'name', 
            'scientific_name', 
            'description',
            'image',
            'image_url',
            'light_requirement', 
            'maintenance_level',
            'watering_frequency', 
            'ideal_temperature', 
            'created_at', 
            'updated_at'
        ]

    def to_representation(self, instance):
        """
        Surcharge pour gérer la représentation de l'image
        """
        ret = super().to_representation(instance)
        # Si image_url est défini, l'utiliser en priorité
        if instance.image_url:
            ret['image'] = instance.image_url
        # Sinon, si une image est uploadée, utiliser son URL
        elif instance.image:
            ret['image'] = instance.image.url if instance.image else None
        return ret

    def validate_watering_frequency(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "La fréquence d'arrosage doit être supérieure à 0"
            )
        return value

    def validate(self, data):
        if not data.get('name'):
            raise serializers.ValidationError({
                "name": "Le nom est requis"
            })
        if not data.get('scientific_name'):
            raise serializers.ValidationError({
                "scientific_name": "Le nom scientifique est requis"
            })
        return data

class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreference
        fields = '__all__'

class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff')