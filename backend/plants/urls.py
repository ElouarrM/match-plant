from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PlantViewSet,             # Changé de PlantAdminViewSet à PlantViewSet
    UserPreferenceViewSet,
    get_recommendations,
    admin_login,
    get_dashboard_stats,
)

# Configuration du routeur pour les vues basées sur ViewSet
router = DefaultRouter()
router.register(r'plants', PlantViewSet)
router.register(r'preferences', UserPreferenceViewSet)

# Liste des URLs
urlpatterns = [
    # Inclusion des URLs du routeur
    path('', include(router.urls)),
    
    # URLs pour les vues basées sur les fonctions
    path('recommendations/', get_recommendations, name='recommendations'),
    path('admin/login/', admin_login, name='admin-login'),
    path('admin/stats/', get_dashboard_stats, name='dashboard-stats'),
]