import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { QuestionnaireProvider } from './contexts/QuestionnaireContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Pages existantes
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import Results from './pages/Results';

// Pages admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import PlantManagement from './pages/admin/PlantManagement';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <QuestionnaireProvider>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/results" element={<Results />} />

            {/* Routes admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/plants" 
              element={
                <ProtectedRoute>
                  <PlantManagement />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </QuestionnaireProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;