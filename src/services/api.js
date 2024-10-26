/* eslint-disable no-unused-vars */
const API_URL = 'http://127.0.0.1:8000/api';
const BASE_URL = 'http://127.0.0.1:8000';

// Fonction utilitaire pour construire les headers
const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem('adminToken');
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

// Fonction utilitaire pour gérer les réponses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || 'Une erreur est survenue');
  }
  return response.json();
};

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b';
  if (imagePath.startsWith('http')) return imagePath;
  return `${BASE_URL}${imagePath}`;
};

const api = {
  // API Publique
  async getRecommendations(preferences) {
    try {
      const response = await fetch(`${API_URL}/recommendations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des recommandations');
      }

      const data = await response.json();

      // Transformer les URLs des images dans les recommandations
      if (data.recommendations) {
        data.recommendations = data.recommendations.map(plant => ({
          ...plant,
          image: getFullImageUrl(plant.image)
        }));
      }

      return data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  async getAllPlants() {
    try {
      const response = await fetch(`${API_URL}/plants/`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Erreur API getAllPlants:', error);
      throw error;
    }
  },

  // API Admin
  async loginAdmin(credentials) {
    try {
      const response = await fetch(`${API_URL}/admin/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await handleResponse(response);
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
      }
      return data;
    } catch (error) {
      console.error('Erreur API loginAdmin:', error);
      throw error;
    }
  },

  async createPlant(plantData) {
    try {
      const formData = new FormData();
      
      // Ajouter chaque champ au FormData
      Object.keys(plantData).forEach(key => {
        if (plantData[key] !== null && plantData[key] !== undefined && plantData[key] !== '') {
          // Traitement spécial pour l'image
          if (key === 'image' && plantData[key] instanceof File) {
            formData.append(key, plantData[key]);
          } else {
            formData.append(key, plantData[key]);
          }
        }
      });

      // Debug log
      for (let pair of formData.entries()) {
        console.log('FormData:', pair[0], pair[1]);
      }

      const response = await fetch(`${API_URL}/plants/`, {
        method: 'POST',
        headers: getAuthHeaders(true),
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur création plante:', errorData);
        throw new Error(errorData.detail || 'Erreur lors de la création de la plante');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API createPlant:', error);
      throw error;
    }
  },

  async updatePlant(id, plantData) {
    try {
      const formData = new FormData();
      
      Object.keys(plantData).forEach(key => {
        if (plantData[key] !== null && plantData[key] !== undefined && plantData[key] !== '') {
          if (key === 'image' && plantData[key] instanceof File) {
            formData.append(key, plantData[key]);
          } else {
            formData.append(key, plantData[key]);
          }
        }
      });

      const response = await fetch(`${API_URL}/plants/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(true),
        body: formData
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Erreur API updatePlant:', error);
      throw error;
    }
  },

  async deletePlant(id) {
    try {
      const response = await fetch(`${API_URL}/plants/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la plante');
      }

      return true;
    } catch (error) {
      console.error('Erreur API deletePlant:', error);
      throw error;
    }
  },

  async getDashboardStats() {
    try {
      const response = await fetch(`${API_URL}/admin/stats/`, {
        headers: getAuthHeaders(),
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Erreur API getDashboardStats:', error);
      throw error;
    }
  }
};

export default api;