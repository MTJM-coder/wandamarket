import React, { useState } from 'react'
import NavBar2 from '@/Layouts/Navbar2'
import SideBar2 from '@/Layouts/SideBar2'
import Products from '@/Layouts/products'
import { FiRotateCcw, FiShoppingBag, FiTruck, FiClock, FiEye, FiTrash2, FiPackage, FiMapPin,FiHeart } from 'react-icons/fi'
import { IconBase } from 'react-icons'
import { Link } from 'react-router-dom'
import Footer from '@/Layouts/footer'
import { usePage,router } from '@inertiajs/react'

const BuyerDashboard = () => {
  const {props}=usePage();
  const auth=props.auth
  const orders=props.orders

  const favoris=props.favoris
  const imageUrl = '/sac1.webp'
  const [showCommande,setShowCommande]=useState(false);
  const [showDasboard,setShowDasboard]=useState(true)
  const [isLoading,setIsLoading]=useState(false);
  const handleRemoveFavorite=(id)=>{
    if(confirm("Retirer ce produit de vos favoris ?")){
     
     router.delete(`/favoris/${id}/remove`)
    }} 

  const handleShowCommande=()=>{
    setShowDasboard(false),
    setShowCommande(true)
  }
  


 

  const Counter = [
    {
      id: 1,
      label: "Total commandes",
      icone: <FiShoppingBag size={24} className='text-black' />,
      number: orders.length,
      iconCation: [
        {
          id: 1,
          icone: <FiEye></FiEye>,
          msg: "voir"
        },
        {
          id: 2,
          icone: <FiTrash2></FiTrash2>,
          msg: "Supprimer"
        }
      ]

    },
    {
      id: 2,
      label: "En cours",
      icone: <FiClock size={24} className='text-black' />,
      number: orders.filter(od=>od.etat=='en cours' || od.etat=='en attente' ).length,
      iconCation: [
        {
          id: 1,
          icone: <FiEye></FiEye>,
          msg: "voir"
        },
        {
          id: 2,
          icone: <FiTrash2></FiTrash2>,
          msg: "Supprimer"
        }
      ]

    },
    {
      id: 3,
      label: "Livreés",
      icone: <FiTruck size={24} className="text-black" />,
      number: orders.filter(od=>od.etat=='livreé').length,
      iconCation: [
        {
          id: 1,
          icone: <FiEye></FiEye>,
          msg: "voir"
        },
        {
          id: 2,
          icone: <FiTrash2></FiTrash2>,
          msg: "Supprimer"
        }
      ]

    },
    {
      id: 4,
      label: "Annulées",
      icone: <FiRotateCcw size={24} className='text-black' />,
      number: orders.filter(od=>od.etat=='annulée').length,
      iconCation: [
        {
          id: 1,
          icone: <FiEye></FiEye>,
          msg: "voir"
        },
        {
          id: 2,
          icone: <FiTrash2></FiTrash2>,
          msg: "Supprimer"
        }
      ]

    }
  ]
  const [activeTab, setActiveTab] = useState('Moi');

  return (
    <>
      <NavBar2/>
      <SideBar2 activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='mt-20  md:ml-32 grid'>
       <div className='grid mx-9 md:mx-0 '>
          <h1 className='text-2xl font-bold'>Tableau de bord acheteur</h1>
          <p className='text-xs text-gray-400'>Bienvenue, suivez vos commandes, messages et favoris.</p>
        </div>
        <div className='grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 grid mx-3 md:mx-0 '>
          {Counter.map((item) => (
            <div className='bg-white rounded-2xl p-5   shadow-sm border border-gray-100 flex items-start gap-4 '>
              <div key={item.id} className='h-11 w-11 flex items-center justify-center rounded-full bg-slate-200'>
                {item.icone}
              </div>
              <div>
                <p className='text-sm text-gray-600'>{item.label}</p>
                <p className='text-lg font-semibold'>{item.number}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Commandes récentes */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#071726] flex items-center">
                <FiPackage className="mr-2 text-[#ec8d0c]" />
                Commandes récentes
              </h2>
              <p className="text-sm text-[#ec8d0c] hover:underline">
                Voir toutes
              </p>
            </div>

            <div className="space-y-4">

              {orders.slice(0,5).map(commande => (
                <div key={commande.id} className="border  border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#071726]">Commande #CMD-{String(commande.id).padStart(4, '0')}</h3>
                      <p className="text-sm text-gray-600">{commande.boutique?.nom} • {new Date(commande.created_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{commande.montant_total}FCFA</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${commande.etat === 'Livrée' ? 'bg-green-100 text-green-800' :
                        commande.etat === 'en attente' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {commande.etat}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Produits :</h4>
                    <ul className="space-y-1">
                      {commande.commande_produits?.map((items, index) => (
                        items.produit && (
                          <li key={index} className="flex justify-between text-sm">
                            <span>{items.produit.nom} × {items.quantite}</span>
                            <span>{items.produit.prix} FCFA</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <p
                        onClick={()=>router.get(`/buyer/order/detail/${commande.id}`)}
                        className="text-sm px-3 py-1 bg-[#071726] text-white rounded cursor-pointer hover:bg-[#0d2a40] transition"
                      >
                        Détails
                      </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          



        </div>
      </div>

      <div className='px-6 pb-8 md:ml-20'>
          <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
            <div className='p-6 border-b border-gray-100'>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold text-gray-900 flex items-center'>
                  <FiHeart className="mr-3 text-red-500" size={24} />
                  Vos favoris ({favoris.length})
                </h2>
                <button
                  onClick={() => router.get('/favoris')}
                  className='text-sm text-orange-500 hover:text-orange-600 font-medium'
                >
                  Tout voir →
                </button>
              </div>
            </div>

            <div className='p-6'>
              {favoris.length === 0 ? (
                <div className="text-center py-12">
                  <FiHeart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun favori
                  </h3>
                  <p className="text-gray-500">
                    Ajoutez des produits à vos favoris pour les retrouver facilement.
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                  {favoris.slice(0, 4).map(fav => (
                    <div key={fav.id} className='bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow'>
                      {fav.produit?.images?.[0]?.url ? (
                        <div 
                          className='h-48 bg-cover bg-center'
                          style={{ 
                            backgroundImage: `url(/storage/${fav.produit.images[0].url})` 
                          }}
                        />
                      ) : (
                        <div className='h-48 bg-gray-200 flex items-center justify-center'>
                          <FiPackage className="text-gray-400" size={32} />
                        </div>
                      )}
                      
                      <div className='p-4'>
                        <h3 className='font-medium text-gray-900 truncate mb-2'>
                          {fav.produit?.nom || 'Produit sans nom'}
                        </h3>
                        <p className='text-orange-500 font-bold mb-3'>
                          {fav.produit?.prix?.toLocaleString() || '0'} FCFA
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => router.get(`/detail-product/${fav.produit?.id}`)}
                            className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
                          >
                            <FiEye className="mr-1" size={14} />
                            Voir
                          </button>
                          <button
                            onClick={() => handleRemoveFavorite(fav.produit.id)}
                            disabled={isLoading}
                            className="text-sm text-red-600 hover:text-red-800 flex items-center disabled:opacity-50"
                          >
                            <FiTrash2 className="mr-1" size={14} />
                            Retirer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        

      </div>

<Footer/>
    </>
    
  )
}

export default BuyerDashboard