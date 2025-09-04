import React, { useState } from 'react';
import AuthenticatedHeader from '../Layouts/AuthenticatedHeader';
import Sidebar from '../Layouts/Sidebar';
import { Head } from '@inertiajs/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AuthenticatedLayout = ({ user = {}, title = '', children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head title={title} />

      {/* Header */}
      <AuthenticatedHeader user={user} />

      {/* Bouton menu mobile */}
      {/* <button 
  onClick={() => setMobileMenuOpen(true)}
  className="md:hidden fixed left-4 top-4 z-50 bg-[#071726] text-white p-2 rounded-lg shadow-lg"
>
  <FiMenu size={24} />
</button> */}

      {/* Sidebar desktop */}
      <div className="hidden md:block">
        <Sidebar user={user} />
      </div>

      {/* Sidebar mobile avec overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64"
            >
              <Sidebar user={user} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute right-0 top-0 transform translate-x-full bg-white p-2 rounded-r-lg shadow-lg text-[#071726]"
              >
                <FiX size={24} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <main className="md:ml-64 pt-20 pb-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AuthenticatedLayout;