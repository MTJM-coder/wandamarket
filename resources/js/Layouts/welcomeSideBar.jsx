import React, { useState, useEffect } from 'react'
import {
  FiHome,
  FiShoppingBag,
  FiMessageSquare,
  FiInbox,
  FiHeart,
  FiMapPin,
  FiUser,
  FiSettings,
  FiShoppingCart
} from 'react-icons/fi'

const WelcomeSideBar = ({activeTab,setActiveTab}) => {
  


  const menuItems = [
    { id: 1, label: 'Accueil', icon: <FiHome className='text-xl' /> },
    // { id: 2, label: 'Articles', icon: <FiShoppingBag className='text-2xl' /> },
    { id: 3, label: 'Messages', icon: <FiMessageSquare className='text-xl' /> },
    // { id: 4, label: 'Commandes', icon: <FiInbox className='text-2xl' /> },
    // { id: 5, label: 'Favoris', icon: <FiHeart className='text-2xl' /> },
    // { id: 6, label: 'Adresses', icon: <FiMapPin className='text-2xl' /> },
    {id:9,label:'Panier',icon:<div className='flex'><FiShoppingCart className='text-xl'/><span className='text-orange-500 -top-14 inline-block'>2</span></div>},
    { id: 7, label: 'Profil', icon: <FiUser className='text-xl' /> },
    
    // { id: 8, label: 'Paramètres', icon: <FiSettings className='text-xl' /> },
  ];

  return (
    <aside
      className='
        fixed z-[100000] bg-black text-white
        flex 
        md:flex-col md:top-16 md:left-0 md:w-[10%] md:h-screen
        bottom-0 left-0 w-full h-12 flex-row justify-around items-center overflow-scroll md:pb-20 scrollbar-hide
      '
    >
      {menuItems.map(({ id, label, icon },index) => (
        <div
         key={id}

                    className={`
      flex flex-col items-center justify-center gap-1 
      md:mb-1 md:p-2 rounded-xl cursor-pointer flex-1 md:flex-none
      transition-all duration-200 ease-in-out mt-3
      
       ${activeTab === label
                            ? "bg-orange-500 text-white shadow-lg p-0"
                            : "hover:bg-orange-100 text-slate-600 hover:text-orange-500"
                        }
      ${index >= 5 ? "hidden md:flex" : ""}
    `}
                     
          onClick={() => {
    setActiveTab(label);
    // Redirection directe sans useEffect
    if (label === "Accueil") window.location.href = '/buyer/dashboard';
    // else if (label === "Commandes") window.location.href = "/buyer/order";
    // else if (label === "Articles") window.location.href = "/product";
    else if (label === "Messages") window.location.href = "/buyer/messages";
    // else if (label === "Favoris") window.location.href = "/favoirs";
    // else if (label === "Adresses") window.location.href = "/buyer/adresses";
    else if (label === "Profil") window.location.href = "/buyer/dashbord";
    // else if (label === "Paramètres") window.location.href = "/buyer/settings";
    else if (label === "Panier") window.location.href = "/panier";

  }}
        >
          {icon}
          <p className=' text-[10px] md:text-sm text-center mb-3'>{label}</p>
        </div>
      ))}
    </aside>
  );
}

export default WelcomeSideBar
