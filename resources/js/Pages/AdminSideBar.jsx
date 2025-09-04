import AdminNavBar from "@/Layouts/AdminNavBar";
import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import {
    FiHome,
    FiUsers,
    FiShoppingBag,
    FiBox,
    FiDollarSign,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";

const AdminSidebar = ({ onSelect , active,setActive}) => {

    const menus = [
        { id: "dashboard", label: "Tableau de bord", icon: <FiHome /> },
        { id: "vendors", label: "Vendeurs", icon: <FiUsers /> },
        { id: "clients", label: "Clients", icon: <FiUsers /> },
        { id: "products", label: "Produits", icon: <FiBox /> },
        { id: "orders", label: "Commandes", icon: <FiShoppingBag /> },
        { id: "payments", label: "Paiements", icon: <FiDollarSign /> },
        { id: "settings", label: "Paramètres", icon: <FiSettings /> },
        {id: "admin",label:"admin",icon:<FaUserTie/> }
    ];

    const handleClick = (id) => {
        setActive(id);
        
    };
    return (
        <div>

            <div className="h-screen w-64 bg-gray-900 text-white flex flex-col ">
                {/* Logo */}
                <div className="p-6 text-2xl font-bold text-yellow-400">
                    WandaMarket Admin
                </div>

                {/* Menu */}
                <nav className="flex-1 px-4">
                    {menus.map((menu) => (
                        <div
                            key={menu.id}
                            onClick={() => {
                                handleClick(menu.id);

                                if (menu.id === "dashboard") window.location.href = '/admin/dashboard';
                                else if (menu.id === "vendors") window.location.href = '/admin/sellers';
                                else if (menu.id === "clients") window.location.href = '/admin/clients';
                                else if (menu.id === "products") window.location.href = '/admin/products';
                                else if (menu.id === "orders") window.location.href = '/admin/orders';
                                else if (menu.id === "payments") window.location.href = '/admin/payments';
                                else if (menu.id === "settings") window.location.href = '/admin/settings';
                                else if (menu.id === "admin") window.location.href='/admin/admins';
                            }}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer mb-2 transition ${active === menu.id
                                    ? "bg-yellow-500 text-black font-semibold"
                                    : "hover:bg-gray-700"
                                }`}
                        >
                            {menu.icon}
                            <span>{menu.label}</span>
                        </div>
                    ))}


                </nav>

                {/* Déconnexion */}
                <div className="p-4 border-t border-gray-700 cursor-pointer flex items-center gap-2 hover:text-red-400">
                    <FiLogOut /> <span>Déconnexion</span>
                </div>
            </div >
        </div >
    );
};

export default AdminSidebar;
