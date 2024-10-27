# 🌿 PlantMatch - Application de Recommandation de Plantes Intelligente

## Aperçu du Projet
PlantMatch est une application web fullstack développée dans le cadre d'un test technique. Elle vise à offrir une expérience utilisateur immersive pour aider les utilisateurs à trouver les plantes parfaites adaptées à leur environnement et leur mode de vie.



## 🎯 Objectif du Projet
Créer une application web interactive qui :
- Offre une expérience utilisateur immersive
- Fournit des recommandations personnalisées de plantes
- Intègre une interface d'administration robuste
- Utilise des technologies modernes (React, Django)

## 🚀 Fonctionnalités Principales

### 💻 Interface Publique

#### 1. Page d'Accueil
- Design moderne avec animations fluides
- Navigation intuitive
- Présentation claire du concept
- Appel à l'action pour commencer le questionnaire

#### 2. Questionnaire Interactif
- **4 étapes progressives :**
  - Type d'espace (Balcon/Terrasse/Rebord)
  - Niveau d'ensoleillement
  - Temps d'entretien disponible
  - Niveau d'expérience en jardinage
- Barre de progression dynamique
- Validation à chaque étape
- Animations de transition fluides

#### 3. Page de Résultats
- Affichage des recommandations personnalisées
- Cartes de plantes interactives avec :
  - Image de la plante
  - Nom commun et scientifique
  - Niveau d'entretien requis
  - Fréquence d'arrosage
  - Conditions idéales
- Option de redémarrage du questionnaire

### 👨‍💼 Interface Administrative

#### 1. Authentification
- Page de login sécurisée
- Gestion des tokens JWT
- Protection des routes administratives

#### 2. Dashboard
- **Statistiques en temps réel :**
  - Nombre total de plantes
  - Nombre de recommandations générées
  - Top 5 des plantes les plus recommandées

#### 3. Gestion des Plantes
- **CRUD complet :**
  - Création de nouvelles plantes
  - Modification des informations
  - Suppression de plantes
- **Système d'images :**
  - Intégration avec ImgBB
  - Stockage des URLs d'images
  - Preview des images avant upload
- **Filtres avancés :**
  - Recherche par nom
  - Filtrage par niveau d'entretien

## 🛠 Technologies Utilisées

### Frontend
- **React 18** avec Vite
- **TailwindCSS** pour le styling
- **React Router 6** pour la navigation
- **Context API** pour la gestion d'état
- **Axios** pour les requêtes API
- **Framer Motion** pour les animations

### Backend
- **Django 4.2**
- **Django Rest Framework**
- **Simple JWT** pour l'authentification
- **Django CORS Headers**
- Intégration ImgBB API

## ⚙️ Installation et Configuration

### Prérequis
```bash
Python 3.8+
Node.js 16+
npm 
Compte ImgBB (pour la gestion des images)
```

### Backend (Django)
```bash
# Cloner le repository
git clone [URL_du_repo]

# Configuration de l'environnement
cd plantmatch_backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Installation des dépendances
pip install -r requirements.txt

# Variables d'environnement
cp .env.example .env
# Configurer les variables dans .env

# Migrations
python manage.py migrate

# Créer un superutilisateur
python manage.py createsuperuser

# Lancer le serveur
python manage.py runserver
```

### Frontend (React+Vite)
```bash
# Configuration du frontend
cd plantmatch-frontend
npm install

# Lancer en développement
npm run dev
```

## 🎨 Design et UX

### Choix de Design
- Interface minimaliste et moderne
- Palette de couleurs naturelles
- Animations subtiles et fonctionnelles
- Design responsive et adaptatif

### Expérience Utilisateur
- Navigation intuitive
- Feedback visuel immédiat
- Messages d'erreur clairs
- Chargements progressifs

## 📦 Structure des Données

### Modèle de Plante
```python
class Plant(models.Model):
    name = CharField(max_length=100)
    scientific_name = CharField(max_length=100)
    description = TextField()
    image_url = URLField()  # Lien ImgBB
    light_requirement = CharField(choices=LIGHT_CHOICES)
    maintenance_level = CharField(choices=MAINTENANCE_CHOICES)
    watering_frequency = IntegerField()
    ideal_temperature = CharField(max_length=50)
```

## 🔄 API Endpoints

### Public
```
GET /api/plants/ - Liste des plantes
POST /api/recommendations/ - Obtenir des recommandations
```

### Admin
```
POST /api/admin/login/ - Authentification
GET /api/admin/stats/ - Statistiques dashboard
POST /api/plants/ - Créer une plante
PUT /api/plants/{id}/ - Modifier une plante
DELETE /api/plants/{id}/ - Supprimer une plante
```


## 📝 Défis Techniques et Solutions

1. **Gestion des Images**
   - Défi : Stockage et performance
   - Solution : Utilisation d'ImgBB pour l'hébergement externe

2. **Système de Recommandation**
   - Défi : Algorithme de matching précis
   - Solution : Système de scoring pondéré

3. **Performance Frontend**
   - Défi : Animations fluides
   - Solution : Optimisation avec React.memo et useMemo

## 🚀 Améliorations Futures

- [ ] Mode sombre
- [ ] Export PDF des recommandations
- [ ] Système de favoris
- [ ] Notifications par email
- [ ] Plus de critères de filtrage


---
Développé avec ❤️ par Monir EL OUARROUDI
Pour tout test technique et démonstration de compétences en développement fullstack.

[Lien vers le design Figma](votre_lien_figma)
[Lien vers la démo](votre_lien_demo)
