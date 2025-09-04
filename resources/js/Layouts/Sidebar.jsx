import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
  FiHome, FiShoppingBag, FiHeart, FiUser, FiSettings, 
  FiCreditCard, FiMessageSquare, FiHelpCircle, FiLogOut,
  FiChevronDown, FiChevronRight,FiMessageCircle
} from 'react-icons/fi';
import { FaStore } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';


const Sidebar = () => {
  const { props } = usePage();
  const user = props.auth.user || {};
  const vendeur = user.role === 'vendeur';

  const [expandedMenus, setExpandedMenus] = useState({
    seller: false, 
    account: false
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#071726] text-white shadow-lg transform transition-all duration-300 ease-in-out z-40">
      {/* Profil utilisateur */}
      <div className="mt-20 flex items-center p-6 border-b border-[#0d2a40]">
        <div className="w-12 h-12 rounded-full bg-[#ec8d0c] flex items-center justify-center text-white text-xl font-bold">
          {user?.nom?.charAt(0) || 'U'}
        </div>
        <div className="ml-4">
          <p className="font-medium">{user?.nom || 'Utilisateur'}</p>
          <p className="text-xs text-gray-300">{user?.email || user?.telephone|| ''}</p>
        </div>
      </div>

      {/* Menu principal */}
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/dashboard-achat" 
              className="flex items-center p-3 rounded-lg hover:bg-[#0d2a40] transition"
            >
              <FiHome className="mr-3" />
              <span>Tableau de bord</span>
            </Link>
          </li>

          <li>
            <Link
              href="/message"
              className="flex items-center p-3 rounded-lg hover:bg-[#0d2a40] transition"
            
            >
            <FiMessageSquare className="mr-3"/>
            <span>Messages</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/produit" 
              className="flex items-center p-3 rounded-lg hover:bg-[#0d2a40] transition"
            >
              <FiShoppingBag className="mr-3" />
              <span>Boutiques & Produits</span>
            </Link>
          </li>

          <li>
            <Link 
            
              href="/favoirs" 
              className="flex items-center p-3 rounded-lg hover:bg-[#0d2a40] transition"
            >
              <FiHeart className="mr-3" />
              <span>Mes favoris</span>
            </Link>
          </li>

          {/* Menu vendeur - Conditionnel */}
          {vendeur && (
            <li>
              <button 
                onClick={() => toggleMenu('seller')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#0d2a40] transition"
              >
                <div className="flex items-center">
                  <FaStore className="mr-3" />
                  <span>Espace Vendeur</span>
                </div>
                {expandedMenus.seller ? <FiChevronDown /> : <FiChevronRight />}
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: expandedMenus.seller ? 'auto' : 0,
                  opacity: expandedMenus.seller ? 1 : 0
                }}
                className="overflow-hidden"
              >
                <ul className="ml-8 space-y-1">
                  <li>
                    <Link 
                      href="/boutique" 
                      className="block p-2 text-sm rounded-lg hover:bg-[#0d2a40] transition"
                    >
                      Tableau de bord
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/seller/products" 
                      className="block p-2 text-sm rounded-lg hover:bg-[#0d2a40] transition"
                    >
                      Mes produits
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </li>
          )}

          {/* Menu compte */}
          {/* <li>
            <button 
              onClick={() => toggleMenu('account')}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#0d2a40] transition"
            >
              <div className="flex items-center">
                <FiUser className="mr-3" />
                <span>Mon Compte</span>
              </div>
              {expandedMenus.account ? <FiChevronDown /> : <FiChevronRight />}
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expandedMenus.account ? 'auto' : 0,
                opacity: expandedMenus.account ? 1 : 0
              }}
              className="overflow-hidden"
            >
              <ul className="ml-8 space-y-1">
                <li>
                  <Link 
                    href="/profile" 
                    className="block p-2 text-sm rounded-lg hover:bg-[#0d2a40] transition"
                  >
                    Profil
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/settings" 
                    className="block p-2 text-sm rounded-lg hover:bg-[#0d2a40] transition"
                  >
                    Paramètres
                  </Link>
                </li>
              </ul>
            </motion.div>
          </li> */}
           <li>
            <Link 
              href="/parametre" 
              className="flex items-center p-3 rounded-lg hover:bg-[#0d2a40] transition"
            >
              <FiUser className="mr-3" />
              <span>Mon compte </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Déconnexion */}
      <div className="absolute bottom-0 w-full p-4 border-t border-[#0d2a40]">
        {/* <Link
          href="/logout"
          method="post"
          as="button"
          className="w-full flex items-center p-3 rounded-lg hover:bg-[#0d2a40] transition text-red-400 hover:text-red-300"
        >
          <FiLogOut className="mr-3" />
          <span>Déconnexion</span>
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;