import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Early Adopters', path: '/adopters' },
];

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <motion.span 
              className="text-2xl font-bold text-purple-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Feedback Base
            </motion.span>
          </Link>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.path}>
                  <motion.span 
                    className="hover:text-purple-400"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 p-4 text-center">
        <p>© 2024 Feedback Base. All rights reserved.</p>
      </footer>
    </div>
  );
}
