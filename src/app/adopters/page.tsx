'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

export default function EarlyAdoptersPage() {
  const [earlyAdopters, setEarlyAdopters] = useState([]);

  useEffect(() => {
    const fetchEarlyAdopters = async () => {
      try {
        const response = await fetch('/api/adopters');
        if (response.ok) {
          const data = await response.json();
          setEarlyAdopters(data);
        } else {
          console.error('Failed to fetch early adopters');
        }
      } catch (error) {
        console.error('Error fetching early adopters:', error);
      }
    };

    fetchEarlyAdopters();
  }, []);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Early Adopters</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {earlyAdopters.map((adopter) => (
            <motion.div
              key={adopter._id}
              className="bg-gray-800 p-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-semibold mb-2">{adopter.username}</h3>
              <p>Joined: {new Date(adopter.joinDate).toLocaleDateString()}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}