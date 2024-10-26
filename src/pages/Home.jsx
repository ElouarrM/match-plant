/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import { Leaf, Target, BookOpen, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Trouvez vos plantes
              <span className="block text-green-600">idéales</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Laissez-nous vous aider à choisir les meilleures plantes 
              pour votre espace et votre style de vie
            </p>
            <Link
              to="/questionnaire"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg
                hover:bg-green-700 transition-all duration-200 text-lg font-medium
                shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Commencer
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              Icon={Target}
              title="Personnalisé"
              description="Recommandations basées sur vos besoins spécifiques et votre environnement"
            />
            <FeatureCard
              Icon={Leaf}
              title="Simple"
              description="Guide pas à pas intuitif pour trouver vos plantes parfaites"
            />
            <FeatureCard
              Icon={BookOpen}
              title="Expert"
              description="Conseils professionnels adaptés à votre niveau d'expérience"
            />
          </div>
        </div>
      </main>
    </>
  );
};

const FeatureCard = ({ Icon, title, description }) => {
  return (
    <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div className="mb-4 flex justify-center">
        <div className="p-3 bg-green-100 rounded-lg">
          <Icon className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default Home;