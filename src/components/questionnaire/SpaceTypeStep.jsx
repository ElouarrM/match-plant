import React from 'react';
import { Home, Trees, LayoutGrid } from 'lucide-react';

const SpaceTypeStep = ({ onSelect, selectedValue }) => {
  const spaceTypes = [
    {
      id: 'BALCONY',
      title: 'Balcon',
      description: 'Espace extérieur avec garde-corps',
      Icon: Home,
      details: 'Idéal pour les plantes qui aiment le soleil'
    },
    {
      id: 'TERRACE',
      title: 'Terrasse',
      description: 'Espace extérieur au niveau du sol',
      Icon: Trees,
      details: 'Parfait pour une grande variété de plantes'
    },
    {
      id: 'WINDOWSILL',
      title: 'Rebord de fenêtre',
      description: 'Espace intérieur lumineux',
      Icon: LayoutGrid,
      details: 'Adapté aux plantes d\'intérieur'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Quel est votre type d'espace ?
        </h2>
        <p className="text-gray-600">
          Sélectionnez l'environnement où vous souhaitez installer vos plantes
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {spaceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`h-full p-6 rounded-xl border-2 text-left transition-colors flex flex-col
              ${selectedValue === type.id 
                ? 'border-green-600 bg-green-50' 
                : 'border-gray-200 hover:border-green-400'
              }
            `}
          >
            {/* Icon */}
            <div className={`p-3 rounded-lg inline-block mb-4
              ${selectedValue === type.id ? 'bg-green-100' : 'bg-gray-100'}`}
            >
              <type.Icon 
                className={`w-6 h-6 
                  ${selectedValue === type.id ? 'text-green-600' : 'text-gray-600'}`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {type.description}
                </p>
                <p className="text-sm text-gray-500">
                  {type.details}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpaceTypeStep;