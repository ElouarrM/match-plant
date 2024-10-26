import { createContext, useContext, useState } from 'react';

const QuestionnaireContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const QuestionnaireProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    space_type: '',
    light_level: '',
    maintenance_time: '',
    experience_level: ''
  });

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const resetQuestionnaire = () => {
    setCurrentStep(0);
    setPreferences({
      space_type: '',
      light_level: '',
      maintenance_time: '',
      experience_level: ''
    });
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        currentStep,
        preferences,
        updatePreference,
        nextStep,
        previousStep,
        resetQuestionnaire
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire doit être utilisé dans un QuestionnaireProvider');
  }
  return context;
};