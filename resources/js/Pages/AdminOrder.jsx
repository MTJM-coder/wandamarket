import AdminNavBar from '@/Layouts/AdminNavBar'
import { router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { FaUserTie } from 'react-icons/fa'
import {
  FiBox, FiClock, FiDollarSign, FiEdit, FiSearch, FiSettings,
  FiShield, FiShoppingBag, FiShoppingCart, FiTrash, FiTruck, FiUser
} from 'react-icons/fi'
import { useMemo } from 'react'
import AlertMessage from '@/Layouts/AlertMessage'


const AdminOrder = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Filtrage instantané avec useMemo pour performance

  const [active, setActive] = useState("orders")
  const { props } = usePage()
  const flash=props
  const orders = props.orders
  const enAttente = orders.filter(od => od.etat == 'en attente').length
  const livre = orders.filter(od => od.etat == 'livré').length
  const enCours = orders.filter(od => od.etat == 'en cours').length

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.id.toString().includes(searchTerm)
      const matchesStatus = filterStatus === 'all' || order.etat === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [orders, searchTerm, filterStatus])

  const etatColors = {
    'en attente': 'bg-gray-300 text-gray-800',
    'en cours': 'bg-orange-100 text-orange-600',
    'annulé': 'bg-red-500 text-white',
    'livré': 'bg-green-400 text-white',
  };

  const supprimer = (id) => {
    if (confirm('voulez-vous supprimer cette commande?')) {
      router.delete(`/admin/remove/order/${id}`);
    }

  }
  return (
    <div>
      <AdminNavBar active={active} setActive={setActive} />
        <AlertMessage message={flash.success} type="success" />
      <AlertMessage message={flash.error} type="error" />

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className='rounded border border-gray-300 text-gray-600 ml-2 text-xs'
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Toutes</option>
                <option value="en attente">En attente</option>
                <option value="en cours">En cours</option>
                <option value="livré">Livré</option>
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
              <FiShoppingBag />
            </div>
            <p className='flex flex-col'>
              <span className='text-sm'>Total <span className='hidden md:inline'>commandes</span></span>
              <span className='font-bold'>{orders.length}</span>
            </p>
          </div>

          <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
            <div className='bg-orange-500 text-white p-2 rounded'>
              <FiClock />
            </div>
            <p className='flex flex-col'>
              <span className='text-sm'>En attente</span>
              <span className='font-bold'>{enAttente}</span>
            </p>
          </div>

          <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
            <div className='bg-blue-500 text-white p-2 rounded'>
              <FiBox />
            </div>
            <p className='flex flex-col'>
              <span className='text-sm'>En cours</span>
              <span className='font-bold'>{enCours}</span>
            </p>
          </div>

          <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
            <div className='bg-green-500 text-white p-2 rounded'>
              <FiTruck />
            </div>
            <p className='flex flex-col'>
              <span className='text-sm'>Livrée</span>
              <span className='font-bold'>{livre}</span>
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
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FiUser className='inline text-green-500' /> Client</p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FiBox className='inline text-orange-500' /> Produits</p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FiDollarSign className='inline text-purple-500' /> Total</p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FiShield className='inline text-orange-500' /> Statut </p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FaUserTie className='inline text-green-500' /> Vendeur</p></th>
              <th className='px-2 py-4 text-left'><p className='flex items-center'><FiSettings className='inline text-blue-500' /> Actions </p></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className='border-b'>
                <td className='px-2 py-4 text-left'>
                  <p className='font-bold'>CMD#0{order.id}</p>
                  <p className='text-xs text-gray-500'>{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                </td>

                <td className='px-2 py-4 text-left'>
                  <p className='font-bold'>{order.user?.nom ?? 'Client inconnu'}</p>
                  <p className='text-xs text-gray-400'>{order.user?.telephone ?? '—'}</p>
                </td>

                <td className='px-2 py-4 text-left'>
                  {order.commande_produits?.length > 0 ? (
                    order.commande_produits.map((cp, index) => (
                      <div key={index} className='mb-2'>
                        <div className='flex items-center gap-2'>
                          <img src={cp.produit?.images?.[0]?.url ? `/storage/${cp.produit.images[0].url}` : ''} alt="Produit" height={34} width={34} className='rounded' />
                          <p className='text-sm font-semibold'>{cp.produit?.nom ?? 'Produit introuvable'}</p>
                        </div>
                        <p className='text-xs text-gray-400 mt-1'>
                          Qte: {cp.quantite} x {parseInt(cp.prix_unitaire)}
                          {/* | Taille: XL */}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className='text-xs text-gray-400'>Aucun produit</p>
                  )}
                </td>

                <td className='px-2 py-4 text-left font-extrabold'>
                  XAF {parseInt(order.commande_produits?.reduce((total, cp) => total + cp.prix_unitaire * cp.quantite, 0) ?? 0)}
                </td>

                <td className='px-2 py-4 text-left'>

                  <span className={`${etatColors[order.etat] ?? 'bg-gray-200 text-gray-600'} px-3 py-1 text-xs rounded`}>
                    {order.etat}
                  </span>
                </td>

                <td className='px-2 py-4 text-left'>
                  <p className='font-bold'>{order.boutique?.nom ?? 'Boutique inconnue'}</p>
                  <p className='text-xs text-gray-400'>{order.boutique?.user?.telephone ?? '—'}</p>
                </td>

                <td className='px-2 py-4 text-left'>
                  <div className='flex gap-3'>
                    <FiEdit className='cursor-pointer hover:text-orange-500' />
                    <FiTrash onClick={() => supprimer(order.id)} className='cursor-pointer hover:text-red-500' />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default AdminOrder
