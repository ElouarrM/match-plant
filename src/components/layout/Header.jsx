import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Home, Search, Settings } from 'lucide-react';
import nutriLogo from '../../assets/nutritech.jpg';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll listener
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, icon: Icon }) => (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
        isActiveLink(to)
          ? 'bg-green-50 text-green-600 font-medium'
          : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {children}
    </Link>
  );

  return (
    <header 
      className={`sticky top-0 z-50 bg-white ${
        isScrolled ? 'shadow-md' : ''
      } transition-shadow duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-200">
              <Sprout className="h-6 w-6 text-green-600" />
              {/* <img src={nutriLogo} alt="PlantMatch" className="h-8 w-8" /> */}
            </div>
            <span className="text-xl font-bold text-gray-900">
              Plant<span className="text-green-600">Match</span>
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            <NavLink to="/" icon={Home}>
              Accueil
            </NavLink>
            <NavLink to="/questionnaire" icon={Search}>
              Trouver mes plantes
            </NavLink>
            <NavLink to="/admin/login" icon={Settings}>
              Admin
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;