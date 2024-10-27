from django.contrib import admin
from .models import Plant, UserPreference

@admin.register(Plant)
class PlantAdmin(admin.ModelAdmin):
    list_display = ('name', 'scientific_name', 'light_requirement', 'maintenance_level', 'watering_frequency')
    list_filter = ('light_requirement', 'maintenance_level')
    search_fields = ('name', 'scientific_name', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Informations principales', {
            'fields': ('name', 'scientific_name', 'description')
        }),
        ('Image', {
            'fields': ('image_url', 'image')
        }),
        ('Caractéristiques', {
            'fields': ('light_requirement', 'maintenance_level', 'watering_frequency', 'ideal_temperature')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
@admin.register(UserPreference)
class UserPreferenceAdmin(admin.ModelAdmin):
    list_display = ('id', 'space_type', 'experience_level', 'created_at')
    list_filter = ('space_type', 'experience_level')