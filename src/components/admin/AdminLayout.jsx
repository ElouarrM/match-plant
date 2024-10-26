/* eslint-disable react/prop-types */
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Flower2, LogOut, Sprout } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  const navItems = [
    {
      path: '/admin/dashboard',
      label: 'Tableau de bord',
      Icon: LayoutDashboard
    },
    {
      path: '/admin/plants',
      label: 'Gestion des plantes',
      Icon: Flower2
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link 
                  to="/admin/dashboard" 
                  className="flex items-center gap-2 text-xl font-bold text-gray-900"
                >
                  <div className="p-1.5 bg-green-100 rounded-lg">
                    <Sprout className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Plant<span className="text-green-600">Match</span></span>
                </Link>
              </div>

              {/* Navigation Items */}
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                {navItems.map(({ path, label, Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${location.pathname === path
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <div className="flex items-center">
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium
                  border-2 border-green-600 text-green-600 hover:bg-green-50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;