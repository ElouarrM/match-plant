import { useState } from 'react';
import api from '../services/api';

const usePlantMatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendations = async (preferences) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getRecommendations(preferences);
      return response; // Retourne la réponse complète
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getRecommendations
  };
};

export default usePlantMatch;