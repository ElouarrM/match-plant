import React, { useState, useEffect } from 'react';
import PlantForm from '../../components/admin/PlantForm';
import PlantCard from '../../components/admin/PlantCard';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';
import { 
  Loader2, 
  AlertCircle, 
  Plus,
  X,
  Flower2,
  Search,
  Filter
} from 'lucide-react';



const PlantManagement = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setIsLoading(true);
      const data = await api.getAllPlants();
      setPlants(data);
    } catch (err) {
      setError('Erreur lors du chargement des plantes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePlant = async (formData) => {
    try {
      setError('');
      await api.createPlant(formData);
      await fetchPlants();
      setShowForm(false);
    } catch (err) {
      setError('Erreur lors du cration');
    }
  };

  const handleUpdatePlant = async (formData) => {
    try {
      setError('');
      await api.updatePlant(selectedPlant.id, formData);
      setSelectedPlant(null);
      setShowForm(false);
      await fetchPlants();
    } catch (err) {
      setError('Erreur lors du mise à jour');
    }
  };

  const handleDeletePlant = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette plante ?')) {
      try {
        setError('')
        await api.deletePlant(id);
        await fetchPlants();
      } catch (err) {
        setError('Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (plant) => {
    setSelectedPlant(plant);
    setShowForm(true);
  };

  const filteredPlants = plants
    .filter(plant => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          plant.name.toLowerCase().includes(searchLower) ||
          plant.scientific_name.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter(plant => {
      if (filter === 'ALL') return true;
      return plant.maintenance_level === filter;
    });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des plantes</h1>
            <p className="mt-1 text-sm text-gray-500">
              {filteredPlants.length} plante{filteredPlants.length !== 1 ? 's' : ''} dans votre catalogue
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg
                hover:bg-green-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Ajouter une plante
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Search and Filter */}
        {!showForm && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une plante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
              >
                <option value="ALL">Tous les niveaux</option>
                <option value="LOW">Facile</option>
                <option value="MEDIUM">Moyen</option>
                <option value="HIGH">Exigeant</option>
              </select>
            </div>
          </div>
        )}

        {/* Form Section */}
        {showForm && (
          <div className="bg-white shadow-sm rounded-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flower2 className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedPlant ? 'Modifier une plante' : 'Ajouter une plante'}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setSelectedPlant(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100
                    transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <PlantForm
                onSubmit={selectedPlant ? handleUpdatePlant : handleCreatePlant}
                initialData={selectedPlant}
              />
            </div>
          </div>
        )}

        {/* Plants Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Chargement des plantes...
            </div>
          </div>
        ) : filteredPlants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Flower2 className="h-12 w-12 mb-4 text-gray-400" />
            <p className="text-lg font-medium">Aucune plante trouvée</p>
            <p className="text-sm">
              {searchTerm ? 'Essayez de modifier vos critères de recherche' : 'Ajoutez des plantes pour commencer'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant) => (
              <PlantCard 
                key={plant.id} 
                plant={plant}
                onEdit={handleEdit}
                onDelete={handleDeletePlant}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PlantManagement;