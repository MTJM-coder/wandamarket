import AdminNavBar from '@/Layouts/AdminNavBar'
import React, { useState } from 'react'
import { FaUserTie } from 'react-icons/fa'
import { 
  FiBox, FiClock, FiDollarSign, FiEdit, FiSearch, FiSettings, 
  FiShield, FiShoppingBag, FiShoppingCart, FiTrash, FiTruck, FiUser 
} from 'react-icons/fi'

const AdminOrder = () => {
  const [active, setActive] = useState("orders")
  return (
    <div>
      <AdminNavBar active={active} setActive={setActive} />

      {/* HEADER */}
      <div className="p-6 bg-white rounded-lg md:ml-60">
        <div className='mb-6 mt-11 md:mt-0'>
          <h2 className="text-2xl font-bold flex items-center mb-1 bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-200 bg-clip-text text-transparent ">
            <span className='inline-block bg-yellow-300 p-2 rounded mr-4 text-white'>
              <FiShoppingCart />
            </span> 
            <p className='flex flex-col'> 
              <span>Gestion des Commandes</span> 
              <span className='text-xs text-black'>Gerer efficacement vos commandes ici</span>
            </p>
          </h2>

          <div className='flex flex-col md:flex-row gap-3'>
            <div className='flex w-full md:w-auto justify-between'>
              <div className='flex items-center border w-full md:w-max px-3 rounded-md'>
                <FiSearch className='text-gray-400' />
                <input
                  type="search"
                  placeholder="numero de commande"
                  className="h-8 px-3 text-xs bg-white rounded-md border-none w-full"
                />
              </div>
              <select 
                className='rounded border border-gray-300 text-gray-600 ml-2 text-xs'
              >
                <option value="all">Toutes</option>
                <option value="attente">En attente</option>
                <option value="cours">En cours</option>
                <option value="termine">Terminé</option>
              </select>
            </div>
            <button className='bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 text-white px-4 rounded-md text-sm py-1'>
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className='p-6 md:ml-60 pb-0 -mt-12'>
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'> 
            <div className='bg-black text-white p-2 rounded'>
              <FiShoppingBag/>
            </div>
            <p className='flex flex-col'>
              <span className='text-sm'>Total <span className='hidden md:inline'>commandes</span></span>
              <span className='font-bold'>03</span>
            </p>
          </div>

          <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'> 
            <div className='bg-orange-500 text-white p-2 rounded'>
              <FiClock/>
            </div>
            <p className='flex flex-col'>
              <span className='text-sm'>En attente</span>
              <span className='font-bold'>03</span>
            </p>
          </div>

          <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'> 
            <div className='bg-blue-500 text-white p-2 rounded'>
              <FiBox/>
            </div>
            <p className='flex flex-col'>
              <span className='text-sm'>En cours</span>
              <span className='font-bold'>03</span>
            </p>
          </div>

          <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'> 
            <div className='bg-green-500 text-white p-2 rounded'>
              <FiTruck/>
            </div>
            <p className='flex flex-col'>
              <span className='text-sm'>Livrée</span>
              <span className='font-bold'>03</span>
            </p>
          </div>
        </div>
      </div>

      {/* TABLE RESPONSIVE */}
      <div className='md:ml-60 px-5 mt-6 overflow-x-auto'>
        <table className='border-collapse min-w-[800px] w-full'>
          <thead className='bg-gray-100 text-sm'>
            <tr>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><span className='text-blue-500'>#</span> Details</p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FiUser className='inline text-green-500'/> Client</p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FiBox className='inline text-orange-500'/> Produits</p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FiDollarSign className='inline text-purple-500'/> Total</p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FiShield className='inline text-orange-500'/> Statut </p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FaUserTie className='inline text-green-500'/> Vendeur</p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FiSettings className='inline text-blue-500'/> Actions </p></th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='px-2 py-4 text-left'>
                <p className='font-bold'>CMD#01</p>
                <p className='text-xs text-gray-500'>22-oct-2024,12:01</p>
              </td>
              <td className='px-2 py-4 text-left'>
                <p className='font-bold'>Jean de dieu</p>
                <p className='text-xs text-gray-400'>650090878</p>
              </td>
              <td className='px-2 py-4 text-left'>
                <div className='flex gap-2 items-center'>
                  <img src="/wach.png" alt="" height={34} width={34} className='rounded'/>
                  <p>Montre de luxe pour capable</p>
                </div>
                <p className='flex gap-4 text-xs text-gray-400 mt-1'>
                  <span>Qte: 1</span>
                  <span>Taille: XL</span>
                </p>
              </td>
              <td className='px-2 py-4 text-left font-extrabold'>XAF20000</td>
              <td className='px-2 py-4 text-left'>
                <span className='bg-orange-100 px-3 py-1 text-xs rounded text-orange-600'>En attente</span>
              </td>
              <td className='px-2 py-4 text-left'>
                <p className='font-bold'>Jean MoMo</p>
                <p className='text-xs text-gray-400'>6789808</p>
              </td>
              <td className='px-2 py-4 text-left'>
                <div className='flex gap-3'>
                  <FiEdit className='cursor-pointer hover:text-orange-500'/>
                  <FiTrash className='cursor-pointer hover:text-red-500'/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminOrder
