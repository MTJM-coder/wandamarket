import React from 'react'
import {
    FiHome,
    FiShoppingBag,
    FiMessageSquare,
    FiInbox,
    FiBarChart2,
    FiUsers,
    FiSettings,
    FiUser
} from 'react-icons/fi'

const sellerSideBar = ({ activeTab, setActiveTab }) => {
    // const [activeTab, setActiveTab] = React.useState('Accueil');
    const menuItems = [
        { id: 1, label: 'Accueil', value: 'Accueil', icon: <FiHome className='text-2xl' />, onClick: () => setActiveTab('Accueil') },
        { id: 2, label: 'Articles', value: 'produits', icon: <FiShoppingBag className='text-2xl' />, onClick: () => setActiveTab('produits') },
        { id: 3, label: 'Messages', value: 'messages', icon: <FiMessageSquare className='text-2xl' />, onClick: () => setActiveTab('messages') },
        { id: 4, label: 'Commandes', value: 'commandes', icon: <FiInbox className='text-2xl' />, onClick: () => setActiveTab('commandes') },
        { id: 6, label: 'Statistiques', value: 'statistiques', icon: <FiBarChart2 className='text-2xl' />, onClick: () => setActiveTab('statistiques') },
        { id: 5, label: "clients", value: 'clients', icon: <FiUsers className='text-2xl' />, onClick: () => setActiveTab('clients') },
        { id: 8, label: 'Paramètres', value: 'parametres', icon: <FiSettings className='text-2xl' />, onClick: () => setActiveTab('Paramètres') },
        // { id: 7, label: 'Profil', value: 'Profil', icon: <FiUser className='text-2xl' />, onClick: () => setActiveTab('Profil') },

    ];




    return (
        <aside
            className='
              fixed z-[100000] bg-black text-white
              flex 
              md:flex-col md:top-16 md:left-0 md:w-[10%] md:h-screen
              bottom-0 left-0 w-full h-16 flex-row justify-around items-center overflow-scroll md:pb-20 scrollbar-hide
            '
        >
            {menuItems.map(({ id, label, icon, onClick, value }, index) => (
                <div
                    key={id}

                    className={`
      flex flex-col items-center justify-center gap-1 
      md:mb-1 md:p-2 rounded-xl cursor-pointer flex-1 md:flex-none
      transition-all duration-200 ease-in-out
      
       ${activeTab === value
                            ? "bg-orange-500 text-white shadow-lg scale-105"
                            : "hover:bg-orange-100 text-slate-600 hover:text-orange-500"
                        }
      ${index >= 5 ? "hidden md:flex" : ""}
    `}
                    onClick={() => {
                        onClick();
                        // Redirection directe sans useEffect
                        if (value === "Accueil") window.location.href = '/seller/dashboard';
                        if (value === "commandes") window.location.href = "/seller/order";
                        else if (value === "produits") window.location.href = "/seller/produits";
                        else if (value === "messages") window.location.href = "/messagerie";
                        else if (value === "clients") window.location.href = "/seller/clients";
                        else if (value === "statistiques") window.location.href = "/seller/stats";
                        else if (value === "parametres") window.location.href = "/parametre";
                        // else if (value === "Profil") window.location.href = "/parametre";
                    }}
                >
                    <div className="text-lg">{icon}</div>
                    <span className="text-[10px] md:text-sm font-medium">{label}</span>
                </div>
            ))}

        </aside>
    )
}

export default sellerSideBar