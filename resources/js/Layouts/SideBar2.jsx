import React from 'react'
import {
  FiHome,
  FiShoppingBag,
  FiMessageSquare,
  FiInbox,
  FiHeart,
  FiMapPin,
  FiUser
} from 'react-icons/fi'

const menuItems = [
  { id: 1, label: 'Accueil', icon: <FiHome className='text-2xl' /> },
  { id: 2, label: 'Articles', icon: <FiShoppingBag className='text-2xl' /> },
  { id: 3, label: 'Messages', icon: <FiMessageSquare className='text-2xl' /> },
  { id: 4, label: 'Commandes', icon: <FiInbox className='text-2xl' /> },
  { id: 5, label: 'Favoris', icon: <FiHeart className='text-2xl' /> },
  { id: 6, label: 'Adresses', icon: <FiMapPin className='text-2xl' /> },
  { id: 7, label: 'Profil', icon: <FiUser className='text-2xl' /> }
]

const SideBar2 = () => {
  return (
    <aside
      className='
        fixed z-[100000] bg-black text-white
        flex 
        md:flex-col md:top-20 md:left-0 md:w-[10%] md:h-screen
        bottom-0 left-0 w-full h-16 flex-row justify-around items-center
      '
    >
      {menuItems.map(({ id, label, icon }) => (
        <div
          key={id}
          className='flex flex-col items-center justify-center 
                     md:mb-5 md:p-2 hover:bg-slate-400 rounded-md cursor-pointer 
                     flex-1 md:flex-none'
        >
          {icon}
          <p className='mt-1 text-[10px] md:text-sm text-center'>{label}</p>
        </div>
      ))}
    </aside>
  )
}

export default SideBar2
