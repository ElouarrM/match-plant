import React from 'react';
import { 
  PencilLine, 
  Trash2, 
  Eye, 
  Activity,
  Droplets,
  Sun
} from 'lucide-react';

const PlantCard = ({ plant, onEdit, onDelete }) => {
  const defaultImage = '/placeholder-plant.jpg';

  const getMaintenanceColor = (level) => {
    const colors = {
      LOW: 'text-green-600 bg-green-50',
      MEDIUM: 'text-yellow-600 bg-yellow-50',
      HIGH: 'text-red-600 bg-red-50'
    };
    return colors[level] || colors.MEDIUM;
  };

  const getMaintenanceLabel = (level) => {
    const labels = {
      LOW: 'Facile',
      MEDIUM: 'Moyen',
      HIGH: 'Exigeant'
    };
    return labels[level] || 'Moyen';
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      {/* Image Container */}
      <div className="relative aspect-w-16 aspect-h-9 rounded-t-xl overflow-hidden">
        <img
          src={plant.image || defaultImage}
          alt={plant.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        
        {/* Quick Info Overlay */}
        <div className="absolute top-2 right-2 flex gap-1">
          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getMaintenanceColor(plant.maintenance_level)}`}>
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              {getMaintenanceLabel(plant.maintenance_level)}
            </span>
          </div>
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit(plant)}
            className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm text-sm font-medium 
              text-gray-700 rounded-lg hover:bg-white transition-colors"
          >
            <PencilLine className="w-4 h-4" />
            Modifier
          </button>
          <button
            onClick={() => onDelete(plant.id)}
            className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm text-sm font-medium 
              text-red-600 rounded-lg hover:bg-white transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {plant.name}
          </h3>
          <p className="text-sm text-gray-500 italic">
            {plant.scientific_name}
          </p>
        </div>

        {/* Plant Details */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Sun className="w-3.5 h-3.5" />
            {plant.light_requirement === 'LOW' ? 'Faible luminosité' :
             plant.light_requirement === 'MEDIUM' ? 'Luminosité moyenne' : 'Forte luminosité'}
          </div>
          <div className="flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5" />
            Arrosage tous les {plant.watering_frequency} jours
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex items-center justify-between md:hidden">
          <button
            onClick={() => onEdit(plant)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 
              hover:bg-green-50 rounded-lg transition-colors"
          >
            <PencilLine className="w-4 h-4" />
            Modifier
          </button>
          <button
            onClick={() => onDelete(plant.id)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 
              hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;