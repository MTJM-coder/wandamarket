import React, { useState } from 'react';
import {
  FiBookOpen, FiUser, FiShoppingCart, FiPhoneCall, FiShield,
  FiBriefcase, FiMapPin, FiBox, FiBarChart, FiMenu
} from 'react-icons/fi';

const NavBar2 = ({ searchTerm, setSearchTerm, filters = {}, setFilters, number, setNumber }) => {

  const [isConnected, setIsConnected] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRubanArticles, setShowRubanArticles] = useState(false);
  const [showRubanCategory, setShowRubanCategory] = useState(false);
  const [showRubanCity, setShowRubanCity] = useState(false);

  const handleRubanChange = (ruban) => {
    setFilters((prev) => ({ ...prev, ruban: [ruban] }));
  };

  const handleCityChange = (city) => {
    setFilters((prev) => ({ ...prev, city: [city] }));
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category: [category] }));
  };

  const rubanItems = ["Articles", "Vendeurs", "Promotions", "Meilleures ventes"];
  const rubanCategoryItems = ["Toutes catégories", "Accessoires", "Mode", "Électroniques"];
  const rubanCityItems = ["Toutes les villes", "Douala", "Yaoundé", "Buea", "Ebolowa", "Baffoussam", "Bamenda", "Dschang", "Edea", "Bagante"];

  return (
    <div className="bg-orange-500 md:bg-white shadow-md fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 md:px-8">
      {/* Logo */}
      <h2 className="md:text-3xl font-bold md:text-orange-500 text-white">WandaMarket.com</h2>

      {/* Search Bar */}
      {/* <input
                type="text"
                placeholder="Que recherchez-vous ?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-6 md:ml-[10%] h-10 w-[50%] max-w-md px-4 rounded-[15px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            /> */}

      {/* Icons */}
      <div className="ml-auto flex items-center space-x-6">

        {/* Panier */}
        <div
          onMouseEnter={() => setShowCart(true)}
          onMouseLeave={() => setShowCart(false)}
          className="relative"
        >
          {/* Icône Panier + Compteur */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <div className='h-15 w-15 text-center bg-gray-200 ml-5  my-5 p-2 rounded-full'>

                <FiShoppingCart className="md:text-2xl text-gray-600 hover:text-orange-500 " />
              </div>
              {number > 0 && (
                <span className="absolute -top-[-10px] -right-20 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {number}
                </span>
              )}
            </div>
          </div>

          {/* Menu Panier */}
          {showCart && (
            <div className="absolute right-0 -mt-4 w-60 bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm">
              <div className="font-semibold">Mon Panier</div>
              <div className="flex items-center justify-center bg-gray-100 p-3 rounded-full w-20 h-20 mx-auto">
                <FiShoppingCart className="text-[40px]" />
                <sup className=" text-2xl text-orange-600">{number}</sup>
              </div>
              {number == 0 && (<div className="text-center text-gray-500">Votre panier est vide</div>)}
              <div className="p-2 rounded-[15px] text-center bg-orange-600 text-white cursor-pointer">
                Voir le panier
              </div>
            </div>
          )}
        </div>

        {/* Compte */}
        <div
          onMouseEnter={() => setShowUserMenu(true)}
          onMouseLeave={() => setShowUserMenu(false)}
          className="relative"
        >
          <div className='h-15 w-15 text-center bg-gray-200  my-5 p-2 rounded-full'>
            <FiUser className="md:text-2xl text-gray-600 hover:text-orange-500 cursor-pointer" />
          </div>

          {showUserMenu && (
            isConnected ? (
              <div className="absolute right-0 -mt-4 w-48 bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm">
                <div className="font-semibold">Jean Paul</div>
                <hr />
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Profil</div>
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Mes Commandes</div>
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Paramètres</div>
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Déconnexion</div>
              </div>
            ) : (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm">
                <div className="font-semibold">Connexion</div>
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Se connecter</div>
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">S'inscrire</div>
              </div>
            )
          )}
        </div>

      </div>

    </div>
  );
};

export default NavBar2;

