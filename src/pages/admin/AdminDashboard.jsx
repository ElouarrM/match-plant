/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';
import { 
  Flower2, 
  ShieldCheck, 
  Loader2, 
  AlertCircle,
  ChevronUp,
  Trophy
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_plants: 0,
    total_recommendations: 0,
    popular_plants: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
        console.error('Erreur:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend }) => (
    <div className="bg-white overflow-hidden shadow-sm rounded-xl hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-green-100">
            <Icon className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-5 flex-1">
            <h3 className="text-sm font-medium text-gray-500">
              {title}
            </h3>
            <div className="flex items-baseline mt-1">
              <p className="text-3xl font-bold text-gray-900">
                {value}
              </p>
              {trend && (
                <span className="ml-2 flex items-center text-sm font-semibold text-green-600">
                  <ChevronUp className="h-4 w-4" />
                  {trend}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Chargement des statistiques...
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-1 text-sm text-gray-500">
            {"Vue d'ensemble de votre application"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <StatCard
            title="Total des plantes"
            value={stats.total_plants}
            icon={Flower2}
          />
          <StatCard
            title="Total des recommandations"
            value={stats.total_recommendations}
            icon={ShieldCheck}
          />
        </div>

        {/* Popular Plants */}
        <div className="bg-white shadow-sm rounded-xl">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Plantes les plus recommandées
              </h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {stats.popular_plants && stats.popular_plants.map((plant, index) => (
                <div 
                  key={plant.id} 
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="h-12 w-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-plant.jpg';
                        }}
                      />
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-green-600">
                            {index + 1}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {plant.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {plant.scientific_name}
                      </p>
                    </div>
                  </div>
                  {plant.recommendation_count && (
                    <span className="text-sm font-medium text-gray-500">
                      {plant.recommendation_count} recommandations
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;