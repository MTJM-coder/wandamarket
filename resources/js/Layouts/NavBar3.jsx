import React, { useEffect, useState, useRef } from 'react';
import {
    FiBox,
    FiBell,
    FiUser,
    FiRefreshCcw,
    FiShoppingBag,
    FiSettings,
    FiLogOut,
    FiChevronDown,
    FiStar,

    FiMenu,
    FiTrendingUp,
    FiUsers
} from 'react-icons/fi';
import { FaCrown, FaStore } from "react-icons/fa"; // Font Awesome
import { usePage } from '@inertiajs/react';


const NavBar3 = ({ activeTab, produit = [], commandes = [], clients = [] }) => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState(3); // Nombre de notifications
    const dropdownRef = useRef();

    const redirigerVers = (lien) => {
        window.location.href = lien;
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Configuration des icônes et couleurs selon l'onglet actif
    const getTabConfig = (tab) => {
        const configs = {
            produits: {
                icon: <FiBox className="text-2xl text-blue-600" />,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                count: produit.length
            },
            commandes: {
                icon: <FiShoppingBag className="text-2xl text-green-600" />,
                color: "text-green-600",
                bgColor: "bg-green-50",
                count: commandes.length
            },
            clients: {
                icon: <FiUser className="text-2xl text-purple-600" />,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
                count: clients.length
            }
        };
        return configs[tab] || null;
    };
    const { props } = usePage()
    const auth = props.auth

    const tabConfig = getTabConfig(activeTab);

    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 z-50">
            <div className="flex items-center justify-between px-4 sm:px-6 h-full max-w-7xl mx-auto">
                {/* Section gauche - Logo/Titre */}
                <div className="flex items-center gap-3 sm:gap-4">


                    {/* Logo/Icône selon l'onglet */}
                    {tabConfig ? (
                        <div className={`p-2 rounded-xl ${tabConfig.bgColor} hidden sm:flex`}>
                            {tabConfig.icon}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">W</span>
                            </div>
                            <h2 className="hidden sm:block text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                WandaMarket.com
                            </h2>
                        </div>
                    )}

                    {/* Titre avec compteur */}
                    {tabConfig && (
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg sm:text-xl font-bold text-gray-900 capitalize">
                                {activeTab}
                            </h1>
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${tabConfig.bgColor} ${tabConfig.color}`}>
                                {tabConfig.count}
                            </div>
                        </div>
                    )}
                </div>

                {/* Section droite - Profil et actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Badge abonnement */}
                    <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full border border-yellow-200">
                        <FaCrown className="text-sm text-yellow-600" />
                        <span className="text-xs font-semibold text-yellow-800">Gratuit</span>
                    </div>

                    {/* Notifications */}
                    <button
                        className="relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                        onClick={() => redirigerVers('/notifications')}
                    >
                        <FiBell className="text-xl text-gray-600 group-hover:text-orange-500 transition-colors" />
                        {notifications > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                    {notifications > 9 ? '9+' : notifications}
                                </span>
                            </div>
                        )}
                    </button>

                    {/* Profil dropdown */}
                    <div ref={dropdownRef} className="relative">
                        <button
                            className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                            onClick={() => setOpen(prev => !prev)}
                        >
                            <div className="relative">
                                <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-transparent group-hover:border-orange-300 transition-all duration-200">
                                    <img
                                        src={`/storage/${auth.user.image}`}
                                        alt="Profil"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-semibold text-sm hidden">
                                        {auth.user.nom.slice(0, 1)}{auth.user?.prenom?.slice(0, 1)}
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <FiChevronDown className={`text-sm text-gray-400 transition-transform duration-200 hidden sm:block ${open ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown menu */}
                        {open && (
                            <>
                                {/* Backdrop pour mobile */}
                                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />

                                <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                                    {/* Header du dropdown */}
                                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-orange-200">
                                                <img
                                                    src={`/storage/${auth.user.image}`}
                                                    alt="Profil"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-semibold">
                                                    {auth.user.nom.slice(0, 1)}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{auth?.user?.nom}</h3>
                                                {/* <p className="text-sm text-gray-500">{auth?.user?.role} {auth?.user?.statut}</p> */}
                                                <div className="flex items-center gap-1">
                                                    <FaStore className="text-xs text-yellow-500 fill-current" />
                                                    <p className="text-sm text-gray-500">{auth?.boutique?.nom}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu items */}
                                    <div className="py-2">
                                        <MenuItem
                                            icon={<FiUser />}
                                            text="Voir le profil"
                                            onClick={() => redirigerVers('/parametre')}
                                            className="text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                                        />
                                        <MenuItem
                                            icon={<FiRefreshCcw />}
                                            text="Basculer en acheteur"
                                            onClick={() => redirigerVers('/buyer/dashboard')}
                                            className="text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                                        />
            
                                        <MenuItem
                                            icon={<FiTrendingUp/>}
                                            text="statistiques"
                                            onClick={() => redirigerVers('/seller/stats')}
                                            className="text-gray-700 md:hidden hover:text-indigo-500 hover:bg-indigo-50  "
                                        />
                                        <MenuItem
                                            icon={<FiUsers/>}
                                            text="Clients"
                                            onClick={() => redirigerVers('/seller/clients')}
                                            className="text-gray-700 md:hidden hover:text-pink-500 hover:bg-pink-50  "
                                        />


                                        {/* Séparateur */}
                                        <div className="my-2 border-t border-gray-100"></div>

                                        <MenuItem
                                            icon={<FiSettings />}
                                            text="Paramètres"
                                            onClick={() => redirigerVers('/parametre')}
                                            className="text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                        />
                                        <MenuItem
                                            icon={<FiLogOut />}
                                            text="Déconnexion"
                                            onClick={() => {redirigerVers('/logout') }}
                                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// Composant MenuItem réutilisable
const MenuItem = ({ icon, text, onClick, className, badge }) => (
    <button
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${className}`}
        onClick={onClick}
    >
        <span className="text-lg">{icon}</span>
        <span className="flex-1 text-left">{text}</span>
        {badge && badge > 0 && (
            <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold min-w-[20px] text-center">
                {badge > 9 ? '9+' : badge}
            </span>
        )}
    </button>
);

export default NavBar3;