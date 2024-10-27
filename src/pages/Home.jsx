import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Leaf, Target, BookOpen, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';

const BackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Particules flottantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-green-200 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Formes géométriques */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 -right-10 w-60 h-60 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Feuilles flottantes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Leaf 
            className="w-6 h-6 text-green-300 transform rotate-45"
            style={{ opacity: 0.3 }}
          />
        </motion.div>
      ))}

      {/* Cercles décoratifs */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute w-2 h-2 border-2 border-green-200 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Lignes décoratives */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${Math.random() * 100}%`}
            y1="0"
            x2={`${Math.random() * 100}%`}
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            className="text-green-500"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center relative">
          {/* Background Animations */}
          <BackgroundShapes />

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 mb-12 relative z-10"
          >
            {/* Title Animation */}
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
              variants={itemVariants}
            >
              <motion.span
                animate={{
                  rotate: [-1, 1, -1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                Trouvez
              </motion.span>{" "}
              vos plantes
              <motion.span
                className="block text-green-600"
                variants={itemVariants}
              >
                idéales
              </motion.span>
            </motion.h1>

            {/* Subtitle Animation */}
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Laissez-nous vous aider à choisir les meilleures plantes 
              pour votre espace et votre style de vie
            </motion.p>

            {/* Button Animation */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/questionnaire"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg
                  hover:bg-green-700 transition-all duration-300 text-lg font-medium
                  shadow-lg hover:shadow-xl"
              >
                <span>Commencer</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <FeatureCard
              Icon={Target}
              title="Personnalisé"
              description="Recommandations basées sur vos besoins spécifiques et votre environnement"
              delay={0}
            />
            <FeatureCard
              Icon={Leaf}
              title="Simple"
              description="Guide pas à pas intuitif pour trouver vos plantes parfaites"
              delay={0.2}
            />
            <FeatureCard
              Icon={BookOpen}
              title="Expert"
              description="Conseils professionnels adaptés à votre niveau d'expérience"
              delay={0.4}
            />
          </motion.div>
        </div>
      </main>
    </>
  );
};

const FeatureCard = ({ Icon, title, description, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay,
          }
        }
      }}
      initial="hidden"
      animate={controls}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 }
      }}
      className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <motion.div
        className="mb-4 flex justify-center"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-3 bg-green-100 rounded-lg">
          <Icon className="w-8 h-8 text-green-600" />
        </div>
      </motion.div>
      <motion.h3
        className="text-xl font-semibold mb-3 text-gray-900"
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 }
        }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-600 leading-relaxed"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default Home;