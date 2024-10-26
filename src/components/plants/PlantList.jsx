import React from 'react';
import PlantCard from './PlantCard';
import { motion } from 'framer-motion';
import { Loader2, Leaf } from 'lucide-react';

const PlantList = ({ plants, isLoading }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="animate-pulse">
              <div className="aspect-w-3 aspect-h-2 bg-gray-200" />
              <div className="p-5 space-y-4">
                <div className="h-4 bg-gray-200 rounded-full w-2/3" />
                <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded-full w-full" />
                  <div className="h-3 bg-gray-200 rounded-full w-5/6" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-lg w-20" />
                  <div className="h-6 bg-gray-200 rounded-lg w-24" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!plants?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <Leaf className="w-12 h-12 mb-4 text-gray-400" />
        <p className="text-lg font-medium">Aucune plante trouvée</p>
        <p className="text-sm">Ajoutez des plantes pour les voir apparaître ici</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {plants.map((plant) => (
        <motion.div
          key={plant.id}
          variants={item}
          className="h-full"
        >
          <PlantCard plant={plant} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlantList;