from django.db import models
from django.core.exceptions import ValidationError

def validate_image(image):
    max_size = 5 * 1024 * 1024  # 5MB
    if image.size > max_size:
        raise ValidationError('Image size should not exceed 5MB.')

class Plant(models.Model):
    # Définir les choix comme constantes de classe
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

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.pk:
            try:
                old_plant = Plant.objects.get(pk=self.pk)
                if old_plant.image and self.image != old_plant.image:
                    old_plant.image.delete(save=False)
            except Plant.DoesNotExist:
                pass
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete(save=False)
        super().delete(*args, **kwargs)

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

    LIGHT_CHOICES = [  # Définir les mêmes choix ici
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

    def __str__(self):
        return f"Préférence {self.id} - {self.space_type}"