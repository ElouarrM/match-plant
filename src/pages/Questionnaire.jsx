import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../contexts/QuestionnaireContext';
import usePlantMatch from '../hooks/usePlantMatch';
import SpaceTypeStep from '../components/questionnaire/SpaceTypeStep';
import LightLevelStep from '../components/questionnaire/LightLevelStep';
import MaintenanceStep from '../components/questionnaire/MaintenanceStep';
import ExperienceStep from '../components/questionnaire/ExperienceStep';
import ProgressBar from '../components/ui/ProgressBar';
import Header from '../components/layout/Header';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

const Questionnaire = () => {
  const navigate = useNavigate();
  const { getRecommendations, isLoading } = usePlantMatch();
  const [error, setError] = useState(null);
  
  const {
    currentStep,
    preferences,
    updatePreference,
    nextStep,
    previousStep
  } = useQuestionnaire();

  const steps = [
    {
      component: SpaceTypeStep,
      props: {
        onSelect: (value) => updatePreference('space_type', value),
        selectedValue: preferences.space_type,
      },
      isValid: () => !!preferences.space_type
    },
    {
      component: LightLevelStep,
      props: {
        onSelect: (value) => updatePreference('light_level', value),
        selectedValue: preferences.light_level,
      },
      isValid: () => !!preferences.light_level
    },
    {
      component: MaintenanceStep,
      props: {
        onSelect: (value) => updatePreference('maintenance_time', value),
        selectedValue: preferences.maintenance_time,
      },
      isValid: () => !!preferences.maintenance_time
    },
    {
      component: ExperienceStep,
      props: {
        onSelect: (value) => updatePreference('experience_level', value),
        selectedValue: preferences.experience_level,
      },
      isValid: () => !!preferences.experience_level
    }
  ];

  const handleSubmit = async () => {
    try {
      setError(null);
      const results = await getRecommendations(preferences);
      if (results && results.recommendations) {
        navigate('/results', { 
          state: { 
            results: {
              recommendations: results.recommendations,
              filters_applied: results.filters_applied
            }
          }
        });
      } else {
        throw new Error('Aucune recommandation trouvée');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des recommandations:', err);
      setError('Une erreur est survenue lors de la recherche de plantes. Veuillez réessayer.');
    }
  };

  const canProceed = steps[currentStep].isValid();
  const CurrentStepComponent = steps[currentStep].component;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Progress */}
          <div className="mb-12">
            <ProgressBar 
              currentStep={currentStep + 1} 
              totalSteps={steps.length} 
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
              <p className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                {error}
              </p>
            </div>
          )}

          {/* Current Step */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <CurrentStepComponent {...steps[currentStep].props} />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 gap-4">
            <button
              onClick={previousStep}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors gap-2
                ${currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-green-600 text-green-600 hover:bg-green-50'
                }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </button>

            <button
              onClick={isLastStep ? handleSubmit : nextStep}
              disabled={!canProceed || isLoading}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors gap-2
                ${!canProceed || isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Chargement...
                </>
              ) : (
                <>
                  {isLastStep ? 'Voir les résultats' : 'Suivant'}
                  {!isLastStep && <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Questionnaire;