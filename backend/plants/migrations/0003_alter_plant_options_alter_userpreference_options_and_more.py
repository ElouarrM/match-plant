# Generated by Django 5.1.2 on 2024-10-26 23:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plants', '0002_alter_plant_image_alter_userpreference_space_type'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='plant',
            options={'verbose_name': 'Plante', 'verbose_name_plural': 'Plantes'},
        ),
        migrations.AlterModelOptions(
            name='userpreference',
            options={'verbose_name': 'Préférence utilisateur', 'verbose_name_plural': 'Préférences utilisateurs'},
        ),
        migrations.AddField(
            model_name='plant',
            name='image_url',
            field=models.URLField(blank=True, help_text="URL de l'image hébergée sur ImgBB", max_length=500, null=True),
        ),
    ]
