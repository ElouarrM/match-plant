/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCcw, Sun, Home, Clock, Award, ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import PlantList from '../components/plants/PlantList';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  if (!results) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sun className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Aucun résultat trouvé
              </h2>
              <p className="text-gray-600 mb-8">
                {"Il semble que vous n'ayez pas encore complété le questionnaire."}
              </p>
              <button
                onClick={() => navigate('/questionnaire')}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg
                  hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Commencer le questionnaire
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  const { recommendations, filters_applied } = results;
  const getSpaceTypeLabel = (type) => {
    const types = {
      'BALCONY': 'Balcon',
      'TERRACE': 'Terrasse',
      'WINDOWSILL': 'Rebord de fenêtre'
    };
    return types[type] || type;
  };

  const getLightLabel = (level) => {
    const levels = {
      'HIGH': 'Forte',
      'MEDIUM': 'Moyenne',
      'LOW': 'Faible'
    };
    return levels[level] || level;
  };

  const getExperienceLabel = (level) => {
    const levels = {
      'BEGINNER': 'Débutant',
      'INTERMEDIATE': 'Intermédiaire',
      'EXPERT': 'Expert'
    };
    return levels[level] || level;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Vos plantes recommandées
              </h1>
              <p className="text-xl text-gray-600">
                Voici une sélection de plantes parfaitement adaptées à vos critères
              </p>
            </div>
            
            {/* Preferences Summary */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Basé sur vos préférences :
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PreferenceItem
                  icon={Home}
                  label="Espace"
                  value={getSpaceTypeLabel(filters_applied.space_type)}
                />
                <PreferenceItem
                  icon={Sun}
                  label="Luminosité"
                  value={getLightLabel(filters_applied.light_level)}
                />
                <PreferenceItem
                  icon={Clock}
                  label="Temps d'entretien"
                  value={`${filters_applied.maintenance_time} min/semaine`}
                />
                <PreferenceItem
                  icon={Award}
                  label="Expérience"
                  value={getExperienceLabel(filters_applied.experience_level)}
                />
              </div>
            </div>

            {/* Plant List */}
            <PlantList plants={recommendations} />

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-600 
                  rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {"Retour à l'accueil"}
              </button>
              <button
                onClick={() => navigate('/questionnaire')}
                className="inline-flex items-center px-6 py-3 border-2 border-green-600 
                  text-green-600 rounded-lg hover:bg-green-50 transition-all duration-200"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Recommencer le questionnaire
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const PreferenceItem = ({ icon: Icon, label, value }) => (
  <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow duration-200">
    <div className="flex items-start space-x-4">
      <div className="p-2 bg-green-100 rounded-lg">
        <Icon className="w-5 h-5 text-green-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default Results;