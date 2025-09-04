import React, { useState, useEffect } from 'react';
import {
  FiBookOpen, FiUser, FiShoppingCart, FiPhoneCall, FiShield,
  FiBriefcase, FiMapPin, FiBox, FiBarChart, FiMenu,
  FiShoppingBag,
  FiFilter
} from 'react-icons/fi';

const NavBar = ({ showFilter, setShowFilter, searchTerm, setSearchTerm, filters = {}, setFilters }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRubanArticles, setShowRubanArticles] = useState(false);
  const [showRubanCategory, setShowRubanCategory] = useState(false);
  const [showRubanCity, setShowRubanCity] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : []
  });

  const number = cart.length


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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

  const redirigerVers = (lien) => {
    window.location.href = lien
  }

  return (

    <div className="md:bg-white bg-orange-500 text-white md:shadow-md fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-4 md:px-8">
      {/* Logo */}
      <h2 className="md:text-3xl font-bold text-white md:text-orange-600">WandaMarket.com</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Que recherchez-vous ?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="hidden md:block ml-6 md:ml-[10%] h-10 w-[50%] max-w-md px-4 rounded-[15px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Icons */}
      <div className="ml-auto flex items-center space-x-3">
        <FiShoppingBag onClick={() => redirigerVers("/buyer/order")} className="text-2xl text-white md:text-gray-600 md:hover:text-orange-500 cursor-pointer m-5" />

        {/* Panier */}
        <div
          onMouseEnter={() => setShowCart(true)}
          onMouseLeave={() => setShowCart(false)}
          className="relative"
        >
          <div className="relative">
            <div className='h-15 w-15 '>

              <FiShoppingCart onClick={() => redirigerVers("/panier")} className="text-2xl text-white md:text-gray-600 md:hover:text-orange-500 cursor-pointer m-5" />
            </div>
            {number > 0 && (
              <span className="absolute -top-[10px] right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {number}
              </span>
            )}
          </div>

          {showCart && (
            <div className="absolute right-0 mt-1 w-60 bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm">
              <div className="font-semibold">Mon Panier</div>
              <div className="flex items-center justify-center bg-gray-100 p-3 rounded-full w-20 h-20 mx-auto">
                <FiShoppingCart className="text-[40px] text-black" />
                <sup className="text-2xl text-orange-600">{number}</sup>
              </div>
              <div className="text-center text-gray-500" >Votre panier est vide</div>
              <div className="p-2 rounded-[15px] text-center bg-orange-600 text-white cursor-pointer" onClick={() => redirigerVers("/panier")}>Voir le panier</div>
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
            <FiUser className="text-2xl text-gray-600 hover:text-orange-500 cursor-pointer" />
          </div>
          {showUserMenu && (
            isConnected ? (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm text-black">
                <div className="font-semibold">Jean Paul</div>
                <hr />
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Profil</div>
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Mes Commandes</div>
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Paramètres</div>
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Déconnexion</div>
              </div>) :
              <div className="absolute right-0 -mt-8 w-48 bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm text-black">
                <div className="font-semibold">Connexion</div>
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Se connecter</div>
                <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">S'inscrire</div>
              </div>
          )}

        </div>
      </div>

      {/* Ruban navigation */}

      {!isScrolled && (
        <div>
          <div className="md:hidden flex absolute left-0 top-[70px] w-full bg-orange-500 text-white justify-around px-3 pb-4 md:text-gray-700 gap-5">
            <input
              type="text"
              placeholder="Que recherchez-vous ?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:hidden text-black md:ml-[10%] h-10 w-[100%] max-w-md px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <div className={`flex items-center gap-2 ${showFilter ? "bg-black rounded px-3" : ""}`} onClick={() => setShowFilter(!showFilter)}>
              <FiFilter /> Filtrer

            </div>

          </div>
          <div className="hidden md:flex  absolute left-0 top-20 w-full bg-white shadow-md justify-around p-4 text-gray-700 "  >
            {/* Ruban Articles */}
            <div
              onMouseEnter={() => setShowRubanArticles(true)}
              onMouseLeave={() => setShowRubanArticles(false)}
              className="relative"
            >
              <p className="flex items-center hover:text-orange-600 cursor-pointer">
                <FiBox className="text-lg mr-2" />
                <span className="hover:border-b-2 hover:border-orange-500">{Array.isArray(filters.ruban) && filters.ruban.length > 0 ? filters.ruban[0] : "Articles"}</span>
              </p>
              {showRubanArticles && (
                <div className="absolute left-0  top-full w-screen max-h-64 overflow-y-auto bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm">
                  {rubanItems.map(item => (
                    <div
                      key={item}
                      className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                      onClick={() => {
                        handleRubanChange(item);
                        setShowRubanArticles(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ruban Catégories */}
            <div
              onMouseEnter={() => setShowRubanCategory(true)}
              onMouseLeave={() => setShowRubanCategory(false)}
              className="relative"
            >
              <p className="flex items-center hover:text-orange-600 cursor-pointer">
                <FiMenu className="text-lg mr-2" />
                <span className="hover:border-b-2 hover:border-orange-500">{filters.category[0] || "Toutes catégories"}</span>
              </p>
              {showRubanCategory && (
                <div className="absolute left-0  top-full w-screen max-h-64 overflow-y-auto bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm">
                  {rubanCategoryItems.map(item => (
                    <div
                      key={item}
                      className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                      onClick={() => {
                        handleCategoryChange(item);
                        setShowRubanCategory(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ruban Villes */}
            <div
              onMouseEnter={() => setShowRubanCity(true)}
              onMouseLeave={() => setShowRubanCity(false)}
              className="relative"
            >
              <p className="flex items-center hover:text-orange-600 cursor-pointer">
                <FiMapPin className="text-lg mr-2" />
                <span className="hover:border-b-2 hover:border-orange-500">{filters.city[0] || "Toutes les villes"}</span>
              </p>
              {showRubanCity && (
                <div className="absolute left-0  top-full w-screen max-h-64 overflow-y-auto bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm">
                  {rubanCityItems.map(city => (
                    <div
                      key={city}
                      className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                      onClick={() => {
                        handleCityChange(city);
                        setShowRubanCity(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Autres liens */}
            <p className="flex items-center hover:text-orange-600 cursor-pointer">
              <FiBriefcase className="text-lg mr-2" />
              <span className="hover:border-b-2 hover:border-orange-500">Vendeurs</span>
            </p>
            <p className="flex items-center hover:text-orange-600 cursor-pointer">
              <FiPhoneCall className="text-lg mr-2" />
              <span className="hover:border-b-2 hover:border-orange-500">Service client</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

