import React, { useEffect, useState, useRef } from 'react';
import { FiBox, FiBell, FiUser, FiRefreshCcw, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';

const NavBar3 = ({ activeTab, produit, commandes , clients = [] }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const redirigerVers=(lien)=>{
        window.location.href=lien
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

    return (
        <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
               {activeTab==="produits"
                 ? <FiBox className="text-2xl text-orange-500" />
                 : activeTab==="commandes"
                 ? <FiShoppingBag className="text-2xl text-orange-500" />
                 : activeTab==="clients"
                 ? <FiUser className="text-2xl text-orange-500" />
                 : <h2 className="hidden md:flex text-2xl font-bold text-orange-600">WandaMarket.com</h2>} 
                
                <h1 className="text-lg md:text-xl font-bold text-gray-900">
                    {(activeTab === "commandes" || activeTab === "produits" || activeTab === "clients") && (
                        <span>
                            {activeTab}
                            <span className="ml-2 text-sm text-gray-500">
                                ({activeTab === 'produits' ? produit.length :
                                    activeTab === 'commandes' ? commandes.length :
                                        activeTab === 'clients' ? clients.length : 0})
                            </span>
                        </span>
                    )}
                </h1>
            </div>

            {/* Profil + dropdown */}
            <div ref={dropdownRef} className="relative flex items-center gap-4">
                <span className="text-sm hidden md:inline-block">
                    Abonnement: <span className="text-orange-500 font-semibold">Gratuit</span>
                </span>
                <FiBell className="text-xl text-gray-600 hover:text-orange-500 cursor-pointer transition" />

                <button 
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500"  
                    onClick={() => setOpen(prev => !prev)}
                >
                    <img src="/sac1.webp" alt="Profil" className="w-full h-full object-cover" />
                </button>

                {open && (
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg z-50">
                        <ul className="py-2 text-sm text-gray-700">
                            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer" 
                                onClick={()=>redirigerVers('/parametre')}
                            >
                                <FiUser /> Voir le profil
                            </li>
                            <li className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'
                                onClick={()=>redirigerVers('/buyer/dashbord')}
                            >
                                <FiRefreshCcw /> Basculer en acheteur
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                                onClick={()=>redirigerVers('/seller/order')}
                            >
                                <FiShoppingBag /> Mes commandes
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                                <FiBell /> Notifications
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                                 onClick={()=>redirigerVers('/parametre')}
                            >
                                <FiSettings /> Paramètres
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer text-red-600">
                                <FiLogOut /> Déconnexion
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar3;
