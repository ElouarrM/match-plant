/* eslint-disable react/prop-types */
import { Sun, CloudSun, Cloud } from 'lucide-react';

const LightLevelStep = ({ onSelect, selectedValue }) => {
  const lightLevels = [
    {
      id: 'HIGH',
      title: 'Plein soleil',
      description: '6+ heures de soleil direct par jour',
      Icon: Sun,
      details: 'Pour les plantes qui aiment l\'exposition directe',
      iconBg: selectedValue === 'HIGH' ? 'bg-amber-100' : 'bg-gray-100',
      iconColor: selectedValue === 'HIGH' ? 'text-amber-600' : 'text-gray-600'
    },
    {
      id: 'MEDIUM',
      title: 'Lumière indirecte',
      description: 'Lumière brillante mais filtrée',
      Icon: CloudSun,
      details: 'Idéal pour la plupart des plantes d\'intérieur',
      iconBg: selectedValue === 'MEDIUM' ? 'bg-yellow-100' : 'bg-gray-100',
      iconColor: selectedValue === 'MEDIUM' ? 'text-yellow-600' : 'text-gray-600'
    },
    {
      id: 'LOW',
      title: 'Peu de lumière',
      description: 'Pas de soleil direct',
      Icon: Cloud,
      details: 'Pour les plantes qui tolèrent l\'ombre',
      iconBg: selectedValue === 'LOW' ? 'bg-blue-100' : 'bg-gray-100',
      iconColor: selectedValue === 'LOW' ? 'text-blue-600' : 'text-gray-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {"Quelle est l'exposition lumineuse ?"}
        </h2>
        <p className="text-gray-600">
          Évaluez la luminosité naturelle de votre espace au cours de la journée
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lightLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => onSelect(level.id)}
            className={`h-full p-6 rounded-xl border-2 text-left transition-colors flex flex-col
              ${selectedValue === level.id 
                ? 'border-green-600 bg-green-50' 
                : 'border-gray-200 hover:border-green-400'
              }
            `}
          >
            {/* Icon */}
            <div className={`p-3 rounded-lg inline-block mb-4 ${level.iconBg}`}>
              <level.Icon className={`w-6 h-6 ${level.iconColor}`} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {level.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {level.description}
                </p>
                <p className="text-sm text-gray-500">
                  {level.details}
                </p>
              </div>

              {/* Light Indicator */}
              <div className="mt-auto pt-4">
                <div className="flex gap-1">
                  <div className={`h-1 flex-1 rounded 
                    ${level.id === 'HIGH' ? 'bg-amber-400' : 'bg-gray-200'}
                  `}/>
                  <div className={`h-1 flex-1 rounded 
                    ${level.id === 'HIGH' || level.id === 'MEDIUM' ? 'bg-yellow-400' : 'bg-gray-200'}
                  `}/>
                  <div className={`h-1 flex-1 rounded bg-blue-400`}/>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Helper text */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Conseil : Observez votre espace à différents moments de la journée
      </p>
    </div>
  );
};

export default LightLevelStep;