import React, { useState } from 'react'
import NavBar2 from '@/Layouts/Navbar2'
import SideBar2 from '@/Layouts/SideBar2'
import Products from '@/Layouts/products'
import { FiRotateCcw, FiShoppingBag, FiTruck, FiClock, FiEye, FiTrash2, FiPackage, FiMapPin } from 'react-icons/fi'
import { IconBase } from 'react-icons'
import { Link } from 'react-router-dom'
import Footer from '@/Layouts/footer'

const BuyerDashboard = () => {
  const imageUrl = '/sac1.webp'
  const [showCommande,setShowCommande]=useState(false);
  const [showDasboard,setShowDasboard]=useState(true)

  const handleShowCommande=()=>{
    setShowDasboard(false),
    setShowCommande(true)
  }
  


  const commandes = [
    {
      id: 1,
      boutique: "shopping mall",
      articles: "console",
      quantite: 2,
      date: "12-02-2025",
      prix: "10000 FCFA",
      etat: "Livrée",
      commandeProduits: [
        {
          produit: [
            {
              nom: "cosole"
            }
          ]
        }

      ]
    },
    {
      id: 2,
      boutique: "shopping mall",
      articles: "pantalon M",
      quantite: 1,
      date: "12-02-2025",
      prix: "20000 FCFA",
      etat: "En cours"
    },
    {
      id: 3,
      boutique: "shopping mall",
      articles: "pantalon M",
      quantite: 5,
      date: "12-02-2025",
      prix: "20000 FCFA",
      etat: "En attente"
    },
  ]

  const Counter = [
    {
      id: 1,
      label: "Total commandes",
      icone: <FiShoppingBag size={24} className='text-black' />,
      number: 10,
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
      number: 4,
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
      number: 4,
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
      number: 2,
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

  const adress=[
    {
      id:1,
      nom:"Maison",
      quartier:"yassa",
      Ville:"Douala",
      pays:"Cameroun"

    },
     {
      id:1,
      nom:"Bureau",
      quartier:"Akwa",
      Ville:"Douala",
      pays:"Cameroun"

    },
     {
      id:1,
      nom:"Ecole",
      quartier:"Bonanjo",
      Ville:"Douala",
      pays:"Cameroun"

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

              {commandes.map(commande => (
                <div key={commande.id} className="border  border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#071726]">Commande #CMD-{String(commande.id).padStart(4, '0')}</h3>
                      <p className="text-sm text-gray-600">{commande.boutique} • {new Date(commande.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{commande.prix}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${commande.etat === 'Livrée' ? 'bg-green-100 text-green-800' :
                        commande.etat === 'En attente' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {commande.etat}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Produits :</h4>
                    <ul className="space-y-1">
                      {commande.commandeProduits?.map((items, index) => (
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
                        // href={`/commandes/${commande.id}`}
                        className="text-sm px-3 py-1 bg-[#071726] text-white rounded hover:bg-[#0d2a40] transition"
                      >
                        Détails
                      </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='rounded bg-white shadow-sm p-5'>
              <h1 className='text-lg font-bold text-[#071726] flex items-center mb-5'>Vos adresses</h1>
             {adress.map((item)=>(
               <div className='flex justify-around items-center rounded-md border p-5 mb-5'>
                <div className=''>
                  <FiMapPin size={24}/>
                </div>
                <div className=''>
                  <p className='text-xl font-bold'>{item.nom}</p>
                  <p className='text-xs text-gray-400'> {item.quartier},{item.Ville},{item.pays}</p>
                </div>

              </div>
              ))}
            <div className='flex justify-around items-center rounded-md border p-5 mb-5'>
              <button>+ Ajouter une adresse</button>
            </div>

          </div>



        </div>
      </div>

      <div className='mt-9 sm:ml-12 md:ml-32 rounded-lg shadow-sm'>
        <div className='flex justify-between'>
          <p className='text-xl font-bold'>Vos favoris</p>
          <p className='text-orange-500 text-end'>Tout voir </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5'>
          <div className='w-[120%] rounded-lg border-[1px]'>
            <div className='h-28 ' style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className='bg-white justify-end p-4'>
              <p className='text-black'>Sac de luxe</p>
              <p className='text-gray-400 text-xs'>1000FCFA</p>
            </div>
          </div>

        </div>

      </div>

{/* <Footer/> */}
    </>
    
  )
}

export default BuyerDashboard