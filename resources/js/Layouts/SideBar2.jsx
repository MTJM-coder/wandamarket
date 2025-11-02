import { usePage } from '@inertiajs/react';
import { color } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { IconBase } from 'react-icons';
import { FaStore } from 'react-icons/fa';
import {
    FiHome,
    FiShoppingBag,
    FiMessageSquare,
    FiInbox,
    FiHeart,
    FiMapPin,
    FiUser,
    FiSettings,
    FiTrendingUp,
    FiGrid,
    FiShoppingCart,
    FiCreditCard,
    FiLogOut
} from 'react-icons/fi';

const SideBar2 = ({ activeTab, setActiveTab }) => {
     const { props } = usePage()
    const auth = props.auth
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    
    const menuItems = [
        {
            id: 1,
            label: 'Tableau de bord',
            shortLabel: 'Moi',
            icon: <FiHome className='text-xl' />,
            route: '/buyer/dashboard',
            color: 'blue',
            description: 'Vue d\'ensemble de votre compte'
        },
        {
            id: 2,
            label: 'Catalogue',
            shortLabel: 'Articles',
            icon: <FiGrid className='text-xl' />,
            route: '/',
            color: 'green',
            description: 'Parcourir tous les produits'
        },
        {
            id: 3,
            label: 'Messages',
            shortLabel: 'Messages',
            icon: <FiMessageSquare className='text-xl' />,
            route: '/messagerie',
            color: 'purple',
            description: 'Conversations avec les vendeurs',
            // badge: 3
        },
        {
            id: 4,
            label: 'Mes Commandes',
            shortLabel: 'Commandes',
            icon: <FiShoppingBag className='text-xl' />,
            route: '/buyer/order',
            color: 'orange',
            description: 'Historique de vos achats'
        },

        {
            id: 7,
            label: 'Mon Profil',
            shortLabel: 'Profil',
            icon: <FiUser className='text-xl' />,
            route: '/buyer/settings',
            color: 'indigo',
            description: 'Informations personnelles'
        },
        {
            id: 5,
            label: 'Favoris',
            shortLabel: 'Favoris',
            icon: <FiHeart className='text-xl' />,
            route: '/favoris',
            color: 'red',
            description: 'Produits que vous aimez',
            // badge: 12
        },



        {
            id: 8,
            label: 'Paramètres',
            shortLabel: 'Paramètres',
            icon: <FiSettings className='text-xl' />,
            route: '/buyer/settings',
            color: 'gray',
            description: 'Configuration du compte'
        },
        {
            id: 9,
            label: 'Deconnexion',
            shortLabel: 'Deconnexion',
            icon: <FiLogOut className='text-xl' />,
            route: '/logout',
            color: 'red',
            description: 'Quitter et fermer les sessions'
        },
        {
            id:10,
            label:auth.boutique ? 'Ma Boutique' : 'Vendre sur Wanda',
            shortLabel: 'Boutique',
            icon: <FaStore className='text-xl' />,
            route: auth.boutique ? '/seller/dashboard' : '/seller-register',
            color: 'teal',
            description: auth.boutique ? 'Gérer votre boutique' : 'Ouvrir une boutique sur Wanda'
        }

    ];

    const getColorClasses = (color, isActive = false) => {
        const colors = {
            blue: {
                bg: isActive ? 'bg-blue-500' : 'hover:bg-blue-50',
                text: isActive ? 'text-white' : 'text-gray-600 hover:text-blue-600',
                icon: isActive ? 'text-white' : 'text-blue-500'
            },
            green: {
                bg: isActive ? 'bg-green-500' : 'hover:bg-green-50',
                text: isActive ? 'text-white' : 'text-gray-600 hover:text-green-600',
                icon: isActive ? 'text-white' : 'text-green-500'
            },
            purple: {
                bg: isActive ? 'bg-purple-500' : 'hover:bg-purple-50',
                text: isActive ? 'text-white' : 'text-gray-600 hover:text-purple-600',
                icon: isActive ? 'text-white' : 'text-purple-500'
            },
            orange: {
                bg: isActive ? 'bg-orange-500' : 'hover:bg-orange-50',
                text: isActive ? 'text-white' : 'text-gray-600 hover:text-orange-600',
                icon: isActive ? 'text-white' : 'text-orange-500'
            },
            red: {
                bg: isActive ? 'bg-red-500' : 'hover:bg-red-50',
                text: isActive ? 'text-white' : 'text-gray-600 hover:text-red-600',
                icon: isActive ? 'text-white' : 'text-red-500'
            },
            teal: {
                bg: isActive ? 'bg-teal-500' : 'hover:bg-teal-50',
                text: isActive ? 'text-white' : 'text-gray-600 hover:text-teal-600',
                icon: isActive ? 'text-white' : 'text-teal-500'
            },
            indigo: {
                bg: isActive ? 'bg-indigo-500' : 'hover:bg-indigo-50',
                text: isActive ? 'text-white' : 'text-gray-600 hover:text-indigo-600',
                icon: isActive ? 'text-white' : 'text-indigo-500'
            },
            gray: {
                bg: isActive ? 'bg-gray-500' : 'hover:bg-gray-50',
                text: isActive ? 'text-white' : 'text-gray-600 hover:text-gray-700',
                icon: isActive ? 'text-white' : 'text-gray-500'
            }
        };
        return colors[color] || colors.gray;
    };

    const handleItemClick = (item) => {
        setActiveTab(item.shortLabel);
        if (item.route) {
            window.location.href = item.route;
        }
    };
   

    return (
        <>
            {/* Sidebar Desktop */}
            <aside
                className={`
                    hidden md:flex flex-col fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg z-40
                    transition-all duration-300 ease-in-out
                    ${isExpanded ? 'w-64' : 'w-20'}
                `}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                {/* Header */}
                {/* <p className="">
  {auth.boutique && (
    <button className="
      mt-2 px-4 py-2 
      bg-gradient-to-r from-indigo-500 to-orange-600 
      text-white text-sm font-semibold 
      rounded-lg shadow-md 
      hover:from-indigo-600 hover:to-orange-700 
      hover:shadow-lg 
      focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-500
      transition-all duration-300
    ">
      Accéder à ma boutique
    </button>
  )}
</p> */}


                {/* Menu Items */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.shortLabel;
                        const colorClasses = getColorClasses(item.color, isActive);

                        return (
                            <div
                                key={item.id}
                                className={`
                                    relative flex items-center p-3 rounded-xl cursor-pointer transition-all duration-300
                                    ${colorClasses.bg} ${colorClasses.text}
                                    ${isActive ? 'shadow-lg transform scale-105' : 'hover:transform hover:scale-102'}
                                `}
                                onClick={() => handleItemClick(item)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className={`flex-shrink-0 ${colorClasses.icon}`}>
                                    {item.icon}
                                </div>

                                {/* Badge de notification */}
                                {item.badge && (
                                    <div className="absolute top-1 left-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-semibold">
                                        {item.badge > 9 ? '9+' : item.badge}
                                    </div>
                                )}

                                <div className={`ml-4 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                    <p className="font-medium">{item.label}</p>
                                    {hoveredItem === item.id && (
                                        <p className="text-xs opacity-75 mt-1">{item.description}</p>
                                    )}
                                </div>

                                {/* Indicateur actif */}
                                {isActive && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Footer */}
                {auth.boutique ?
                    <div className="p-4 border-t border-gray-100">
                        <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                            <div onClick={()=>window.location.href='/seller/dashboard'} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                                <FaStore className="text-gray-500" />
                                <span className="text-sm text-gray-600">Ma boutique</span>
                            </div>
                        </div>
                    </div>:
                    <div className="p-4 border-t border-gray-100">
                        <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                            <a href="/seller-register" className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-500 to-orange-600 text-white rounded-xl shadow-md hover:from-indigo-600 hover:to-orange-700 transition-colors">
                                <FaStore className="text-white" />  
                                <span className="text-sm font-semibold">Vendre sur Wanda</span>
                            </a>
                        </div>
                    </div>
                }
            </aside>

            {/* Bottom Navigation Mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
                <div className="flex items-center justify-around p-2">
                    {menuItems.slice(0, 4).map((item) => {
                        const isActive = activeTab === item.shortLabel;
                        const colorClasses = getColorClasses(item.color, isActive);

                        return (
                            <div
                                key={item.id}
                                className={`
                                    relative flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer transition-all duration-200
                                    ${colorClasses.bg} ${colorClasses.text}
                                    ${isActive ? 'shadow-md transform -translate-y-1' : 'hover:transform hover:-translate-y-0.5'}
                                    min-w-[60px]
                                `}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className={`${colorClasses.icon} mb-1`}>
                                    {item.icon}
                                </div>

                                {/* Badge de notification */}
                                {item.badge && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-semibold">
                                        {item.badge > 9 ? '9+' : item.badge}
                                    </div>
                                )}

                                <span className="text-xs font-medium text-center leading-tight">
                                    {item.shortLabel}
                                </span>

                                {/* Indicateur actif */}
                                {isActive && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-current rounded-full"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Menu étendu mobile */}
            <div className="md:hidden">
                {/* Bouton pour accéder aux autres options */}
                <button
                    className="fixed bottom-20 right-4 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-orange-600 transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <FiGrid className="text-xl" />
                </button>

                {/* Overlay pour le menu étendu */}
                {isExpanded && (
                    <>
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-50"
                            onClick={() => setIsExpanded(false)}
                        />
                        <div className="fixed bottom-20 right-4 bg-white rounded-2xl shadow-2xl z-50 p-4 w-64">
                            <h3 className="font-semibold text-gray-800 mb-4">Plus d'options</h3>
                            <div className="space-y-2">
                                {menuItems.slice(4).map((item) => {
                                    const isActive = activeTab === item.shortLabel;
                                    const colorClasses = getColorClasses(item.color, isActive);

                                    return (
                                        <div
                                            key={item.id}
                                            className={`
                                                flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200
                                                ${colorClasses.bg} ${colorClasses.text}
                                            `}
                                            onClick={() => {
                                                handleItemClick(item);
                                                setIsExpanded(false);
                                            }}
                                        >
                                            <div className={`${colorClasses.icon} mr-3`}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.label}</p>
                                                <p className="text-xs opacity-75">{item.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Spacer pour le contenu principal */}
            <div className="md:w-20"></div>
        </>
    );
};

export default SideBar2;