import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FiSearch, FiShoppingCart, FiBell } from 'react-icons/fi';
import { FaStore } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AuthenticatedHeader = ({ user = {}, vendeur = false }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white shadow-md py-3">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/dashboard" className="ml-20 flex items-center space-x-2">
            <div className="font-bold text-2xl text-[#071726]">WANDA</div>
            <div className="font-bold text-2xl text-[#ec8d0c]">MARKET</div>
          </Link>

          {/* Barre de recherche (visible sur desktop) */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Bouton conditionnel Vendre/Créer ma boutique */}
            {vendeur ? (
              <Link 
                href="/seller/dashboard" 
                className="hidden md:flex items-center px-3 py-2 bg-[#071726] text-white rounded-md hover:bg-[#0d2a40] transition"
              >
                <FaStore className="mr-2" />
                <span>Vendre</span>
              </Link>
            ) : (
              <Link 
                href="/seller-register" 
                className="hidden md:flex items-center px-3 py-2 bg-[#071726] text-white rounded-md hover:bg-[#0d2a40] transition"
              >
                <FaStore className="mr-2" />
                <span>Créer ma boutique</span>
              </Link>
            )}

            <Link href="/cart" className="p-2 relative">
              <FiShoppingCart className="text-[#071726] h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-[#d93d0f] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            <button className="p-2 relative">
              <FiBell className="text-[#071726] h-6 w-6" />
            </button>

            {/* Menu profil */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#071726] flex items-center justify-center text-white">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Utilisateur'}</p>
                      <p className="text-xs text-gray-500">{user?.email || ''}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        Mon profil
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        Mes commandes
                      </Link>
                    </div>
                    <div className="py-1 border-t border-gray-100">
                      <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        Déconnexion
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;