/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Sprout, Leaf, TreesIcon } from 'lucide-react';

const ExperienceStep = ({ onSelect, selectedValue }) => {
  const experienceLevels = [
    {
      id: 'BEGINNER',
      title: 'Débutant',
      description: 'Première expérience avec les plantes',
      Icon: Sprout,
      details: 'Parfait pour commencer votre aventure végétale',
      traits: [
        'Découverte du jardinage',
        'Plantes faciles à entretenir',
        'Conseils de base'
      ],
      skillLevel: 1
    },
    {
      id: 'INTERMEDIATE',
      title: 'Intermédiaire',
      description: 'Quelques succès avec les plantes',
      Icon: Leaf,
      details: 'Vous avez déjà fait pousser des plantes avec succès',
      traits: [
        'Expérience diversifiée',
        'Comprend les besoins basiques',
        'Prêt pour plus de défis'
      ],
      skillLevel: 2
    },
    {
      id: 'EXPERT',
      title: 'Expert',
      description: 'Jardinier expérimenté',
      Icon: TreesIcon,
      details: 'Vous maîtrisez l\'art du jardinage',
      traits: [
        'Grande expertise',
        'Plantes exigeantes',
        'Techniques avancées'
      ],
      skillLevel: 3
    }
  ];

  const SkillIndicator = ({ level }) => (
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
          {"Quel est votre niveau d'expérience ?"}
        </h2>
        <p className="text-gray-600">
          Choisissez le niveau qui correspond le mieux à votre expérience en jardinage
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {experienceLevels.map((level) => (
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
            <div className={`p-3 rounded-lg inline-block mb-4
              ${selectedValue === level.id ? 'bg-green-100' : 'bg-gray-100'}`}
            >
              <level.Icon 
                className={`w-6 h-6 
                  ${selectedValue === level.id ? 'text-green-600' : 'text-gray-600'}`}
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

                {/* Traits */}
                <ul className="space-y-1">
                  {level.traits.map((trait, index) => (
                    <li 
                      key={index}
                      className="text-xs text-gray-500 flex items-center"
                    >
                      <div className="w-1 h-1 bg-green-400 rounded-full mr-2" />
                      {trait}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress Bar */}
              <div className="mt-auto pt-4">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1 flex-1 rounded transition-colors
                        ${index < experienceLevels.findIndex(l => l.id === level.id) + 1
                          ? 'bg-green-400' 
                          : 'bg-gray-200'
                        }`}
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
        Conseil : Soyez honnête dans votre évaluation pour des recommandations adaptées
      </p>
    </div>
  );
};

export default ExperienceStep;