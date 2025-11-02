import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { 
  Home, 
  ShoppingBag, 
  MessageSquare, 
  Inbox, 
  Heart, 
  MapPin, 
  User, 
  Settings, 
  ShoppingCart,
  Bell
} from 'lucide-react';

const WelcomeSideBar = ({ activeTab, setActiveTab }) => {
  // Récupérer le panier depuis localStorage
    const {props}=usePage()
    const auth=props.auth
   
    const [cart, setCart] = useState(() => {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    });
  const [notifications, setNotifications] = useState({
    // messages: 3,
    cart: cart.length,
    orders: 1
  });

   

  const menuItems = [
    { 
      id: 1, 
      label: 'Accueil', 
      icon: Home,
      route: '/buyer/dashboard',
      color: 'text-blue-500',
      hoverColor: 'hover:bg-blue-50'
    },
    { 
      id: 3, 
      label: 'Messages', 
      icon: MessageSquare,
      route: '/messagerie',
      color: 'text-green-500',
      hoverColor: 'hover:bg-green-50',
      badge: notifications.messages
    },
    { 
      id: 9, 
      label: 'Panier', 
      icon: ShoppingCart,
      route: '/panier',
      color: 'text-orange-500',
      hoverColor: 'hover:bg-orange-50',
      badge: notifications.cart
    },
    { 
      id: 7, 
      label: 'Profil', 
      icon: User,
      route: '/buyer/dashboard',
      color: 'text-purple-500',
      hoverColor: 'hover:bg-purple-50'
    }
  ];

  const handleNavigation = (item) => {
    setActiveTab(item.label);
    
    // Animation de feedback
    const element = document.getElementById(`menu-item-${item.id}`);
    if (element) {
      element.classList.add('animate-pulse');
      setTimeout(() => {
        element.classList.remove('animate-pulse');
      }, 200);
    }
    
    // Navigation
    setTimeout(() => {
      window.location.href = item.route;
    }, 150);
  };

  const renderBadge = (count) => {
    if (!count || count === 0) return null;
    
    return (
      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium shadow-lg animate-bounce">
        {count > 99 ? '99+' : count}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-16 w-20 lg:w-64 h-screen bg-white border-r border-gray-200 shadow-lg z-50 flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="hidden lg:block">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Navigation</h2>
            <p className="text-sm text-gray-500">Accès rapide à vos outils</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.label;
            
            return (
              <button
                key={item.id}
                id={`menu-item-${item.id}`}
                onClick={() => handleNavigation(item)}
                className={`
                  relative w-full flex items-center p-3 rounded-xl transition-all duration-300 ease-out group
                  ${isActive 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105' 
                    : `text-gray-600 ${item.hoverColor} hover:shadow-md hover:transform hover:scale-102`
                  }
                  focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2
                `}
              >
                <div className="relative">
                  <IconComponent 
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isActive ? 'text-white' : item.color
                    }`} 
                  />
                  {renderBadge(item.badge)}
                </div>
                
                <span className={`
                  hidden lg:block ml-4 font-medium transition-all duration-200
                  ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}
                `}>
                  {item.label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <div className="hidden lg:block absolute right-3 w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="hidden lg:flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Utilisateur</p>
              <p className="text-xs text-gray-500">En ligne</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="flex justify-around items-center py-2 px-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.label;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`
                  relative flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px] transition-all duration-200
                  ${isActive 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                  }
                  focus:outline-none focus:ring-2 focus:ring-orange-300
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
                  text-xs font-medium transition-colors duration-200 text-center
                  ${isActive ? 'text-white' : 'text-gray-600'}
                `}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile spacing */}
      <div className="md:hidden h-20"></div>
    </>
  );
};

export default WelcomeSideBar;