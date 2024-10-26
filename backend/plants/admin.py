from django.contrib import admin
from .models import Plant, UserPreference

@admin.register(Plant)
class PlantAdmin(admin.ModelAdmin):
    list_display = ('name', 'scientific_name', 'light_requirement', 'maintenance_level')
    search_fields = ('name', 'scientific_name')
    list_filter = ('light_requirement', 'maintenance_level')

@admin.register(UserPreference)
class UserPreferenceAdmin(admin.ModelAdmin):
    list_display = ('id', 'space_type', 'experience_level', 'created_at')
    list_filter = ('space_type', 'experience_level')