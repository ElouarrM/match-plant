import React from 'react';
import { Clock, Sprout, TreePalm } from 'lucide-react';

const MaintenanceStep = ({ onSelect, selectedValue }) => {
  const maintenanceLevels = [
    {
      value: 5,
      title: 'Minimal',
      description: '5 minutes par semaine',
      Icon: Sprout,
      details: 'Pour les plantes qui demandent peu d\'attention',
      activities: ['Arrosage basique', 'Inspection rapide'],
      timeIndicator: 1
    },
    {
      value: 15,
      title: 'Modéré',
      description: '15 minutes par semaine',
      Icon: Clock,
      details: 'Un équilibre entre entretien et facilité',
      activities: ['Arrosage régulier', 'Nettoyage des feuilles', 'Inspection'],
      timeIndicator: 2
    },
    {
      value: 30,
      title: 'Régulier',
      description: '30 minutes par semaine',
      Icon: TreePalm,
      details: 'Pour un entretien plus approfondi',
      activities: ['Arrosage précis', 'Taille', 'Fertilisation', 'Surveillance détaillée'],
      timeIndicator: 3
    }
  ];

  const TimeIndicator = ({ level }) => (
    <div className="flex gap-1 mt-3">
      {[...Array(3)].map((_, index) => (
        <div 
          key={index}
          className={`h-1.5 flex-1 rounded transition-colors
            ${index < level 
              ? 'bg-green-400' 
              : 'bg-gray-200'
            }`}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Combien de temps pour l'entretien ?
        </h2>
        <p className="text-gray-600">
          Choisissez le niveau d'entretien qui correspond à votre disponibilité
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {maintenanceLevels.map((level, index) => (
          <button
            key={level.value}
            onClick={() => onSelect(level.value)}
            className={`h-full p-6 rounded-xl border-2 text-left transition-colors flex flex-col
              ${selectedValue === level.value 
                ? 'border-green-600 bg-green-50' 
                : 'border-gray-200 hover:border-green-400'
              }
            `}
          >
            {/* Icon */}
            <div className={`p-3 rounded-lg inline-block mb-4
              ${selectedValue === level.value ? 'bg-green-100' : 'bg-gray-100'}`}
            >
              <level.Icon 
                className={`w-6 h-6 
                  ${selectedValue === level.value ? 'text-green-600' : 'text-gray-600'}`}
              />
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
                <p className="text-sm text-gray-500 mb-4">
                  {level.details}
                </p>

                {/* Activities */}
                <ul className="space-y-1">
                  {level.activities.map((activity, idx) => (
                    <li 
                      key={idx}
                      className="text-xs text-gray-500 flex items-center"
                    >
                      <div className="w-1 h-1 bg-green-400 rounded-full mr-2" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Time Indicator */}
              <div className="mt-auto pt-4">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1 flex-1 rounded transition-colors
                        ${i <= index ? 'bg-green-400' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Helper text */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Conseil : Commencez doucement, vous pourrez toujours ajuster plus tard
      </p>
    </div>
  );
};

export default MaintenanceStep;