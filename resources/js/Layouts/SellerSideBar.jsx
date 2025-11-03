import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { 
  Home, 
  ShoppingBag, 
  MessageSquare, 
  Inbox, 
  BarChart2, 
  Users, 
  Settings, 
  User,
  Package,
  TrendingUp,
  Bell
} from 'lucide-react';
import { FaStore } from 'react-icons/fa';


const SellerSideBar = ({ activeTab, setActiveTab,unRead }) => {
  const {props}=usePage();
  const auth=props.auth;
  const [notifications, setNotifications] = useState({
    // messages: 5,
    // orders: 8,
    // products: 2
  });


  const menuItems = [
    { 
      id: 1, 
      label: 'Tableau de bord', 
      value: 'Accueil', 
      icon: Home,
      route: '/seller/dashboard',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-50'
    },
    { 
      id: 2, 
      label: 'Produits', 
      value: 'produits', 
      icon: Package,
      route: '/seller/produits',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-50',
      
    },
    { 
      id: 4, 
      label: 'Commandes', 
      value: 'commandes', 
      icon: Inbox,
      route: '/seller/order',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-50',
      badge: notifications.orders
    },
    { 
      id: 3, 
      label: 'Messages', 
      value: 'messages', 
      icon: MessageSquare,
      route: '/messagerie',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-50',
      badge: unRead
    },
    { 
      id: 6, 
      label: 'Analytics', 
      value: 'statistiques', 
      icon: TrendingUp,
      route: '/seller/stats',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      hoverColor: 'hover:bg-indigo-50'
    },
    { 
      id: 5, 
      label: 'Clients', 
      value: 'clients', 
      icon: Users,
      route: '/seller/clients',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      hoverColor: 'hover:bg-pink-50'
    },
    { 
      id: 8, 
      label: 'Paramètres', 
      value: 'parametres', 
      icon: Settings,
      route: '/parametre',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      hoverColor: 'hover:bg-gray-50'
    }
  ];

  const handleNavigation = (item) => {
    setActiveTab(item.value);
    
    // Animation de feedback tactile
    const element = document.getElementById(`seller-menu-${item.id}`);
    if (element) {
      element.classList.add('animate-pulse');
      setTimeout(() => {
        element.classList.remove('animate-pulse');
      }, 200);
    }
    
    // Délai pour l'animation avant navigation
    setTimeout(() => {
      window.location.href = item.route;
    }, 150);
  };

  const renderBadge = (count) => {
    if (!count || count === 0) return null;
    
    return (
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold shadow-lg animate-bounce border-2 border-white">
        {count > 99 ? '99+' : count}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-16 w-20 lg:w-72 h-screen bg-white border-r border-gray-200 shadow-xl z-50 flex-col">
        
        {/* Header Section */}
        <div className="p-4 lg:p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-orange-100">
          <div className="hidden lg:block">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Dashboard Vendeur</h2>
            <p className="text-sm text-gray-600">Gérez votre boutique efficacement</p>
          </div>
          <div className="lg:hidden flex justify-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.value;
            const showOnMobile = index < 5; // Afficher seulement les 5 premiers sur mobile
            
            return (
              <button
                key={item.id}
                id={`seller-menu-${item.id}`}
                onClick={() => handleNavigation(item)}
                className={`
                  relative w-full flex items-center p-3 lg:p-4 rounded-xl transition-all duration-300 ease-out group
                  ${isActive 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-[1.02]' 
                    : `text-gray-700 ${item.hoverColor} hover:shadow-md hover:transform hover:scale-[1.01]`
                  }
                  ${!showOnMobile ? 'hidden lg:flex' : ''}
                  focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2
                  active:transform active:scale-95
                `}
              >
                <div className="relative flex-shrink-0">
                  <IconComponent 
                    className={`w-6 h-6 lg:w-7 lg:h-7 transition-all duration-200 ${
                      isActive ? 'text-white' : item.color
                    }`} 
                  />
                  {renderBadge(item.badge)}
                </div>
                
                <div className="hidden lg:flex flex-col items-start ml-4 flex-1">
                  <span className={`
                    font-semibold text-sm transition-all duration-200
                    ${isActive ? 'text-white' : 'text-gray-800 group-hover:text-gray-900'}
                  `}>
                    {item.label}
                  </span>
                  {item.badge && !isActive && (
                    <span className="text-xs text-gray-500 mt-0.5">
                      {item.badge} nouveau{item.badge > 1 ? 'x' : ''}
                    </span>
                  )}
                </div>

                {/* Indicateur actif */}
                {isActive && (
                  <>
                    <div className="hidden lg:block absolute right-3 w-2 h-2 bg-white rounded-full opacity-90"></div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                  </>
                )}

                {/* Effet de survol */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Stats rapides */}
        {/* <div className="hidden lg:block p-4 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-lg font-bold text-orange-500">{notifications.orders}</div>
              <div className="text-xs text-gray-500">Commandes</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-lg font-bold text-green-500">{notifications.products}</div>
              <div className="text-xs text-gray-500">Produits</div>
            </div>
          </div>
        </div> */}

        {/* Footer avec profil */}
        <div className="p-4 border-t border-gray-100 mb-16">
          <div className="hidden lg:flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
              <FaStore className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{auth.boutique?.nom}</p>
              <p className="text-xs text-gray-500">Vendeur vérifié</p>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
          </div>
          <div className="lg:hidden flex justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
              <FaStore className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="flex justify-around items-center py-2 px-2">
          {menuItems.slice(0, 4).map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.value;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`
                  relative flex flex-col items-center justify-center p-2 rounded-xl min-w-[65px] transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-t from-orange-500 to-orange-600 text-white shadow-lg transform scale-105' 
                    : `text-gray-600 hover:text-orange-500 ${item.hoverColor}`
                  }
                  focus:outline-none focus:ring-2 focus:ring-orange-300
                  active:transform active:scale-95
                `}
              >
                <div className="relative mb-1">
                  <IconComponent 
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? 'text-white' : item.color
                    }`} 
                  />
                  {renderBadge(item.badge)}
                </div>
                
                <span className={`
                  text-xs font-medium transition-colors duration-200 text-center leading-tight
                  ${isActive ? 'text-white' : 'text-gray-600'}
                `}>
                  {item.label.length > 8 ? item.label.substring(0, 8) + '...' : item.label}
                </span>

                {/* Indicateur actif mobile */}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Indicateur de scroll sur mobile */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-b-full"></div>
      </nav>

      {/* Espaceur pour le contenu principal */}
      <div className="md:hidden h-20"></div>
    </>
  );
};

export default SellerSideBar;