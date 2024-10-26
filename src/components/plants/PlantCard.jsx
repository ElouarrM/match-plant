/* eslint-disable react/prop-types */
import { 
  Droplets, 
  Sun, 
  ThermometerSun, 
  Activity,
  Clock
} from 'lucide-react';

const PlantCard = ({ plant }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b';

  const handleImageError = (e) => {
    console.log('Image error, using default image');
    e.target.src = defaultImage;
  };

  const getMaintenanceConfig = (level) => {
    const configs = {
      LOW: { 
        label: 'Facile', 
        classes: 'bg-green-100 text-green-700 border-green-200',
        icon: <Activity className="w-3 h-3" />
      },
      MEDIUM: { 
        label: 'Moyen', 
        classes: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: <Activity className="w-3 h-3" />
      },
      HIGH: { 
        label: 'Exigeant', 
        classes: 'bg-red-100 text-red-700 border-red-200',
        icon: <Activity className="w-3 h-3" />
      }
    };
    return configs[level] || configs.MEDIUM;
  };

  const getLightConfig = (level) => {
    const configs = {
      LOW: { label: 'Faible luminosité' },
      MEDIUM: { label: 'Luminosité moyenne' },
      HIGH: { label: 'Forte luminosité' }
    };
    return configs[level] || configs.MEDIUM;
  };

  const maintenanceConfig = getMaintenanceConfig(plant.maintenance_level);
  const lightConfig = getLightConfig(plant.light_requirement);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="aspect-w-3 aspect-h-2 relative group">
        <img
          src={plant.image || defaultImage}
          alt={plant.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
        />
        {plant.ideal_temperature && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-700">
              <ThermometerSun className="w-3 h-3" />
              {plant.ideal_temperature}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{plant.name}</h3>
        <p className="text-sm text-gray-500 italic mb-3">{plant.scientific_name}</p>
        
        {plant.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{plant.description}</p>
        )}
        
        <div className="space-y-2">
          {/* Maintenance Level */}
          <div className="flex items-center gap-2 text-sm">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border ${maintenanceConfig.classes}`}>
              {maintenanceConfig.icon}
              {maintenanceConfig.label}
            </span>
          </div>

          {/* Light and Watering Info */}
          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Sun className="w-3.5 h-3.5" />
              {lightConfig.label}
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5" />
              Arrosage tous les {plant.watering_frequency} jours
            </div>
            {plant.maintenance_time && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {plant.maintenance_time} min/semaine
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;