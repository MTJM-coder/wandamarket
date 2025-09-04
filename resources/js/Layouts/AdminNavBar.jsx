import React from "react";
import { useState } from "react";
import AdminSidebar from "@/Pages/AdminSideBar";
import { FiBell, FiUser, FiLogOut, FiSearch, FiMenu, FiXCircle, FiXOctagon } from "react-icons/fi";

const AdminNavBar = ({active,setActive}) => {
  const [open, setOpen] = useState(false);
  // alert(active)
  return (
    <div className="fixed w-full md:w-max top-0">
      <div className="hidden md:block">
        <AdminSidebar active={active} setActive={setActive}/>
      </div>
    <div className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md md:hidden">
      {!open ? (
      <div className="text-2xl p-2 bg-yellow-400 rounded shadow-md" onClick={() => setOpen(!open)}>
      <FiMenu/>
      </div >)
      :
      <div className="text-2xl p-2 bg-red-500 rounded shadow-md" onClick={() => setOpen(!open)}>
        <FiXOctagon/>
      </div>
      }
      {/* Logo */}
      <div className="text-xl font-bold text-yellow-400 hidden md:flex">
        WandaMarket Admin
      </div>
      <div className="flex items-center gap-6">
        <FiBell className="cursor-pointer hover:text-yellow-400" size={20} />
        
        {/* Profil */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FiUser size={20} />
          <span className="text-sm">Admin</span>
        </div>

        {/* Déconnexion */}
        
      </div>
    </div>
    <div>
      {open && <AdminSidebar active={active} setActive={setActive}/>}
    </div>
    </div>
  );
};

export default AdminNavBar;
