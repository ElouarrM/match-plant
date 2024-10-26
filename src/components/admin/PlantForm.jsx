import React, { useState } from 'react';
import { 
  Sun, 
  Droplets, 
  Thermometer, 
  ImagePlus, 
  Flower2, 
  AlertCircle,
  Save,
  Loader2,
  Upload
} from 'lucide-react';

export function PlantForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    scientific_name: initialData?.scientific_name || '',
    description: initialData?.description || '',
    light_requirement: initialData?.light_requirement || 'MEDIUM',
    maintenance_level: initialData?.maintenance_level || 'LOW',
    watering_frequency: initialData?.watering_frequency || 7,
    ideal_temperature: initialData?.ideal_temperature || '',
    image: null
  });

  const [previewUrl, setPreviewUrl] = useState(initialData?.image || null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        setFormData(prev => ({ ...prev, [name]: file }));
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!formData.name || !formData.scientific_name) {
        throw new Error('Les champs nom et nom scientifique sont requis');
      }

      if (!formData.watering_frequency || formData.watering_frequency < 1) {
        throw new Error("La fréquence d'arrosage doit être supérieure à 0");
      }

      const submitData = {
        ...formData,
        watering_frequency: parseInt(formData.watering_frequency)
      };

      await onSubmit(submitData);

      if (!initialData) {
        setFormData({
          name: '',
          scientific_name: '',
          description: '',
          light_requirement: 'MEDIUM',
          maintenance_level: 'LOW',
          watering_frequency: 7,
          ideal_temperature: '',
          image: null
        });
        setPreviewUrl(null);
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  const FormField = ({ label, children, icon: Icon, colSpan = 1, helper }) => (
    <div className={`${colSpan === 2 ? 'sm:col-span-2' : ''} space-y-1.5`}>
      <label className="block text-sm font-medium text-gray-700">
        <div className="flex items-center gap-1.5 mb-1.5">
          {Icon && <Icon className="w-4 h-4 text-gray-400" />}
          {label}
        </div>
      </label>
      {children}
      {helper && (
        <p className="text-xs text-gray-500 mt-1">{helper}</p>
      )}
    </div>
  );

  const inputClasses = `
    block w-full rounded-lg border-0 px-3 py-2.5
    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 
    placeholder:text-gray-400
    focus:ring-2 focus:ring-inset focus:ring-green-600
    transition-all duration-200
    bg-white/50 backdrop-blur-sm
  `;

  const selectClasses = `
    block w-full rounded-lg border-0 px-3 py-2.5
    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200
    focus:ring-2 focus:ring-inset focus:ring-green-600
    transition-all duration-200
    bg-white/50 backdrop-blur-sm
  `;

  return (
    <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm p-8">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField 
          label="Nom" 
          icon={Flower2}
          helper="Nom commun de la plante"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ex: Monstera Deliciosa"
            className={inputClasses}
          />
        </FormField>

        <FormField 
          label="Nom scientifique" 
          icon={Flower2}
          helper="Nom latin de la plante"
        >
          <input
            type="text"
            name="scientific_name"
            value={formData.scientific_name}
            onChange={handleChange}
            required
            placeholder="Ex: Monstera deliciosa"
            className={inputClasses}
          />
        </FormField>

        <FormField 
          label="Description" 
          icon={Flower2} 
          colSpan={2}
          helper="Description détaillée de la plante"
        >
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Décrivez la plante..."
            className={inputClasses + " resize-none"}
          />
        </FormField>

        <FormField 
          label="Niveau de lumière" 
          icon={Sun}
          helper="Besoin en luminosité de la plante"
        >
          <select
            name="light_requirement"
            value={formData.light_requirement}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="LOW">Faible luminosité</option>
            <option value="MEDIUM">Luminosité moyenne</option>
            <option value="HIGH">Forte luminosité</option>
          </select>
        </FormField>

        <FormField 
          label="Niveau d'entretien" 
          icon={Flower2}
          helper="Niveau de difficulté d'entretien"
        >
          <select
            name="maintenance_level"
            value={formData.maintenance_level}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="LOW">Facile</option>
            <option value="MEDIUM">Moyen</option>
            <option value="HIGH">Exigeant</option>
          </select>
        </FormField>

        <FormField 
          label="Fréquence d'arrosage" 
          icon={Droplets}
          helper="Nombre de jours entre chaque arrosage"
        >
          <div className="relative">
            <input
              type="number"
              name="watering_frequency"
              value={formData.watering_frequency}
              onChange={handleChange}
              min="1"
              required
              className={inputClasses}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              jours
            </span>
          </div>
        </FormField>

        <FormField 
          label="Température idéale" 
          icon={Thermometer}
          helper="Plage de température optimale"
        >
          <input
            type="text"
            name="ideal_temperature"
            value={formData.ideal_temperature}
            required
            onChange={handleChange}
            placeholder="Ex: 18-25°C"
            className={inputClasses}
          />
        </FormField>

        <FormField 
          label="Image" 
          icon={ImagePlus} 
          colSpan={2}
          helper="Format accepté : JPG, PNG (max 5MB)"
        >
          <div className="mt-1">
            {previewUrl ? (
              <div className="relative group">
                <img
                  src={previewUrl}
                  alt="Prévisualisation"
                  className="h-40 w-full object-cover rounded-lg border border-gray-200"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <label className="cursor-pointer p-2 bg-white/90 rounded-lg hover:bg-white 
                    transition-colors text-sm flex items-center gap-2 text-gray-700">
                    <Upload className="w-4 h-4" />
                    Changer l'image
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <label className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 
                px-6 py-10 transition-colors hover:border-gray-400 cursor-pointer">
                <div className="text-center">
                  <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <span className="relative cursor-pointer rounded-md font-semibold text-green-600 
                      focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 
                      focus-within:ring-offset-2 hover:text-green-500">
                      Sélectionner une image
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                        className="sr-only"
                      />
                    </span>
                    <p className="pl-1">ou glisser-déposer</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG jusqu'à 5MB</p>
                </div>
              </label>
            )}
          </div>
        </FormField>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white
            transition-all duration-200 shadow-sm
            ${isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 hover:shadow'
            }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {initialData ? 'Modifier' : 'Créer'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default PlantForm;