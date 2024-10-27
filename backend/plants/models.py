from django.db import models
from django.core.exceptions import ValidationError

def validate_image(image):
    max_size = 5 * 1024 * 1024  # 5MB
    if image and image.size > max_size:
        raise ValidationError('Image size should not exceed 5MB.')

class Plant(models.Model):
    LIGHT_CHOICES = [
        ('LOW', 'Faible luminosité'),
        ('MEDIUM', 'Luminosité moyenne'),
        ('HIGH', 'Forte luminosité'),
    ]

    MAINTENANCE_CHOICES = [
        ('LOW', 'Facile'),
        ('MEDIUM', 'Moyen'),
        ('HIGH', 'Exigeant'),
    ]

    name = models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.URLField(
        max_length=500, 
        blank=True, 
        null=True,
        help_text="URL de l'image hébergée sur ImgBB"
    )
    image = models.ImageField(
        upload_to='plants/', 
        validators=[validate_image],
        null=True,
        blank=True
    )
    light_requirement = models.CharField(
        max_length=6,
        choices=LIGHT_CHOICES,
        default='MEDIUM'
    )
    maintenance_level = models.CharField(
        max_length=6,
        choices=MAINTENANCE_CHOICES,
        default='LOW'
    )
    watering_frequency = models.IntegerField(
        help_text="Nombre de jours entre les arrosages"
    )
    ideal_temperature = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Plante"
        verbose_name_plural = "Plantes"

    def __str__(self):
        return self.name

    def get_image_url(self):
        if self.image_url:
            return self.image_url
        if self.image:
            return self.image.url
        return None

class UserPreference(models.Model):
    SPACE_CHOICES = [
        ('BALCONY', 'Balcon'),
        ('TERRACE', 'Terrasse'),
        ('WINDOWSILL', 'Rebord de fenêtre'),
    ]

    EXPERIENCE_CHOICES = [
        ('BEGINNER', 'Débutant'),
        ('INTERMEDIATE', 'Intermédiaire'),
        ('EXPERT', 'Expert')
    ]

    LIGHT_CHOICES = [
        ('LOW', 'Faible luminosité'),
        ('MEDIUM', 'Luminosité moyenne'),
        ('HIGH', 'Forte luminosité'),
    ]

    space_type = models.CharField(max_length=15, choices=SPACE_CHOICES)
    light_level = models.CharField(
        max_length=6,
        choices=LIGHT_CHOICES
    )
    maintenance_time = models.IntegerField(help_text="Minutes par semaine")
    experience_level = models.CharField(max_length=15, choices=EXPERIENCE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Préférence utilisateur"
        verbose_name_plural = "Préférences utilisateurs"

    def __str__(self):
        return f"Préférence {self.id} - {self.space_type}"