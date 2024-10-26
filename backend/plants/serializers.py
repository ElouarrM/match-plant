from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Plant, UserPreference

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'

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