import React from 'react'
import AdminNavBar from '@/Layouts/AdminNavBar'
import { useState } from 'react';
import { FiEdit, FiTrash2, FiBarChart, FiDollarSign, FiPlus, FiShoppingBag, FiMoreHorizontal, FiUser, FiMapPin,FiShield,FiShieldOff,FiUsers,FiBox,FiSearch,FiUserCheck,FiUserX,FiMail,FiCalendar,FiSettings,FiPhone } from 'react-icons/fi';
import { FaUserTie } from 'react-icons/fa';
import { usePage } from '@inertiajs/react';

const AdminSeller = () => {
   
    const [active, setActive] = useState("vendors");
    const [openMenu, setOpenMenu] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null)
    const produit = [
        {
            id: 1,
            nom: "Ordinateur Portable HP",
            prix: 350000,
            reduction: 10,
            prix_reduit: 315000,
            quantite: 8,
            disponible: 1,
            categorie: "Informatique",
            images: [
                { url: "produits/hp-laptop.jpg" },
                { url: "produits/hp-laptop-2.jpg" }
            ]
        },
        {
            id: 2,
            nom: "Casque Bluetooth JBL",
            prix: 55000,
            reduction: 0,
            prix_reduit: null,
            quantite: 15,
            disponible: 1,
            categorie: "Accessoires",
            images: [
                { url: "produits/casque-jbl.jpg" }
            ]
        },
        {
            id: 3,
            nom: "Chaussures Nike Air Max",
            prix: 85000,
            reduction: 20,
            prix_reduit: 68000,
            quantite: 0,
            disponible: 0,
            categorie: "Mode",
            images: [
                { url: "produits/nike-airmax.jpg" }
            ]
        },
        {
            id: 4,
            nom: "Montre Connectée Apple Watch",
            prix: 200000,
            reduction: 5,
            prix_reduit: 190000,
            quantite: 3,
            disponible: 1,
            categorie: "Technologie",
            images: [
                { url: "produits/apple-watch.jpg" }
            ]
        },
    ];

    const COMMANDES = [
        {
            id: "#270238450501025537",
            date: "21-07-2025, 07:00",
            prix: "19,000 FCFA",
            acheteur: "Jean Dupont",
            etat: "En attente de confirmation",
            adresse: "Yassa, Douala",
            article: "DY-03 Montre Femme Quartz Mode avec Bracelet en Pierres Précieuses, Boucles d’oreilles et Bague",
            categorie: "Mode",
            couleur: "Vert",
            quantite: 10,
            imageUrl: "/wach.png",
        },
        {
            id: "#270238450501025538",
            date: "12-02-2025, 14:00",
            prix: "10,000 FCFA",
            acheteur: "Amina Sow",
            etat: "Livrée",
            adresse: "Dakar Plateau, Douala, Cameroun",
            article: "Vêtement de femme",
            categorie: "Mode",
            couleur: "Rouge",
            quantite: 2,
            imageUrl: "/dressGirl.png",
        },
    ];
    const {props}=usePage()
    const flash=props
    const vendeurs = props.vendeurs
  
 const vendeursInactifs=vendeurs.filter(vendeur=>vendeur.statut=="inactif").length

 const vendeursActifs=vendeurs.filter(vendeur=>vendeur.statut=="actif").length


    return (
        <div>
            <AdminNavBar active={active} setActive={setActive} />
            {!activeMenu && (
                <div className="p-6 bg-white rounded-lg shadow-md md:ml-60">
                    <div className='mb-6 mt-11 md:mt-0'>
                        <h2 className="text-2xl font-bold flex items-center mb-1 bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-200 bg-clip-text text-transparent "><span className='inline-block bg-yellow-300 p-2 rounded mr-4 text-white'><FiUsers className='' /></span> <p className='flex flex-col'> <span>Gestion des vendeurs</span> <span className='text-xs text-black'>Gerer efficacement vos vendeurs ici</span></p></h2>
                        <div className='flex md:block gap-3'>
                            <div className='flex items-center border w-max px-3 rounded-md '>
                                <FiSearch className='text-gray-400' />
                                <input
                                    type="search"
                                    placeholder="Rechercher un vendeur par nom ou email"
                                    className="h-8 px-3 text-xs bg-white rounded-md border-none "
                                />

                            </div>
                            <button className='bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 text-white px-2 rounded-md md:mt-2 text-sm py-1'>Valider</button>
                        </div>
                    </div>
                    <div className='flex mb-6 gap-5'>
                        <div className='bg-white flex items-center gap-5 shadow-md p-5 rounded'>
                            <div className='bg-green-700 p-3 rounded text-white'><FaUserTie /></div>
                            <div className='flex flex-col'>
                                <span className='text-sm'>Total vendeur</span>
                                <span className='font-bold'>{vendeurs.length}</span>

                            </div>

                        </div>
                        <div className='bg-white flex items-center gap-5 shadow-md p-5 rounded'>
                            <div className='bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 p-3 rounded text-white'><FiUserCheck /></div>
                            <div className='flex flex-col'>
                                <span className='text-sm'>vendeur Actif</span>
                                <span className='font-bold'>{vendeursActifs}</span>

                            </div>

                        </div>
                        <div className='bg-white flex items-center gap-5 shadow-md p-5 rounded'>
                            <div className='bg-gradient-to-r from-red-600 via-red-500 to-red-400 p-3 rounded text-white'><FiUserX /></div>
                            <div className='flex flex-col'>
                                <span className='text-sm'>vendeur Inactif</span>
                                <span className='font-bold'>{vendeursInactifs}</span>

                            </div>

                        </div>

                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-x-2 border-collapse border border-gray-200 overflow-auto">
                            <thead>
                                <tr className="bg-gray-100 md:text-inherit text-xs">
                                    <th className="tracking-wider px-2 py-4 text-left  items-center">
                                        <FiUser className="inline mr-2 text-blue-300" />Details vendeur
                                    </th>
                                    <th className="tracking-wider px-2 py-4 text-left items-center">
                                        <FiMail className="inline mr-2 text-green-300" />Contact infos
                                    </th>
                                    <th className="tracking-wider px-2 py-4 text-left items-center">
                                        <FiShield className="inline mr-2 text-green-300" />Statut
                                    </th>
                                    <th className="tracking-wider px-2 py-4 text-left  items-center">
                                        <FiCalendar className="inline mr-2 text-orange-300" />Date
                                    </th>
                                    <th className="tracking-wider px-2 py-4 text-left  items-center">
                                        <FiSettings className="inline mr-2 text-purple-300" />Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendeurs.map((vendeur) => (
                                    <tr key={vendeur.id}>
                                        <td className="px-2 py-4 text-left">
                                            <p className="font-bold md:text-xl">{vendeur.nom}</p>
                                            <p className="text-xs p-2 border w-max m-2 rounded bg-gray-100">ID:{vendeur.id}</p>
                                        </td>
                                        <td className="text-xs text-gray-600 space-y-2 font-semibold px-2 py-4 text-left">
                                            <p>
                                                <FiMail className="inline" /> <span>{vendeur.email}</span>
                                            </p>
                                            <p>
                                                <FiPhone className="inline" /> <span>{vendeur.telephone}</span>
                                            </p>
                                            <p>
                                                <FiMapPin className="inline" /> <span>{vendeur.ville}, {vendeur.quartier}</span>
                                            </p>
                                        </td>
                                        <td className="space-y-1 px-2 py-4 text-left">
                                            <p className={`text-sm px-5  rounded w-max ${vendeur.statut === "inactif" ? "bg-red-200 text-red-700" : "bg-green-300 text-green-700"} `}>{vendeur.statut}</p>
                                        </td>
                                        <td className="space-y-1 px-2 py-4 text-left">
                                            <p className="text-xs">
                                                <span className="font-bold">Inscris: </span><span>{new Date(vendeur.created_at).toLocaleDateString('fr-FR')}</span>
                                            </p>
                                            <p className="text-xs">
                                                <span className="font-bold">Modifié: </span><span>{new Date(vendeur.updated_at).toLocaleDateString('fr-FR')}</span>
                                            </p>
                                        </td>
                                        <td className="px-2 py-4 text-left">
                                            <div className="flex gap-3 md:gap-5">
                                                {vendeur.statu === "actif" ? (
                                                    <FiShieldOff className="hover:text-orange-500 cursor-pointer" />
                                                ) : (
                                                    <FiShield className="hover:text-orange-500 cursor-pointer" />
                                                )}
                                                <FiTrash2 className="hover:text-red-500 cursor-pointer" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            )}
            {activeMenu == "commandes" && (
                <div className="p-4 md:p-8 space-y-6 md:ml-60 ">

                    {COMMANDES.map((commande) => (
                        <div
                            key={commande.id}
                            className="bg-white shadow-md rounded-2xl overflow-hidden border"
                        >
                            {/* En-tête */}
                            <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-6 p-4 border-b text-sm">
                                <p className="font-semibold text-[#071726]">Commande {commande.id}</p>
                                <p>Date : <span className="text-gray-700">{commande.date}</span></p>
                                <p>Total : <span className="font-bold">{commande.prix}</span></p>
                            </div>

                            {/* Acheteur + Adresse */}
                            <div className="p-4 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <FiUser />
                                    <span>Acheteur : <strong>{commande.acheteur}</strong></span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <FiMapPin className="mr-2" />
                                    <span>{commande.adresse}</span>
                                </div>
                            </div>

                            {/* Produit */}
                            <div className="p-4 flex items-start gap-4">
                                <img
                                    src={commande.imageUrl}
                                    alt={commande.article}
                                    className="w-24 h-24 object-cover rounded-lg border"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{commande.article}</p>
                                    <p className="text-sm text-gray-600">
                                        Catégorie : {commande.categorie} • Couleur :{" "}
                                        <span className="text-green-600 font-medium">{commande.couleur}</span>
                                    </p>
                                    <p className="text-sm text-gray-600">Quantité : {commande.quantite}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-4 flex flex-wrap justify-end gap-3 border-t">
                                {commande.statut === "En attente de confirmation" && (
                                    <>
                                        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">
                                            Confirmer
                                        </button>
                                        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200">
                                            Annuler
                                        </button>
                                    </>
                                )}
                                {commande.statut === "Livrée" ? (
                                    <span className="px-4 py-2 text-green-600 font-medium">
                                        ✅ Commande livrée
                                    </span>
                                ) : (
                                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                                        Marquer comme expédiée
                                    </button>
                                )}
                                <button className="px-4 py-2 border rounded-full hover:bg-gray-100">
                                    Voir détails
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {activeMenu == "abonnement" && (
                <div className="p-4 md:p-8 space-y-6 md:ml-60">

                    {/* En-tête */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Abonnement du vendeur</h2>
                        <button
                            onClick={() => setActiveMenu(null)}
                            className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                            ⬅ Retour
                        </button>
                    </div>

                    {/* Infos de l'abonnement */}
                    <div className="bg-white shadow-md rounded-xl p-6 border">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Détails de l’abonnement</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <p><span className="font-medium">Nom du vendeur :</span> Jean Dupont</p>
                            <p><span className="font-medium">Email :</span> jean@gmail.com</p>
                            <p><span className="font-medium">Téléphone :</span> 0707070707</p>
                            <p><span className="font-medium">Ville :</span> Douala</p>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                            <p><span className="font-medium">Plan actuel :</span> Premium</p>
                            <p><span className="font-medium">Durée :</span> 1 an</p>
                            <p><span className="font-medium">Prix :</span> 50,000 FCFA</p>
                            <p><span className="font-medium">Date d’expiration :</span> 21-07-2026</p>
                            <p>
                                <span className="font-medium">Statut :</span>
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                    Actif
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Actions admin */}
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200">
                            Modifier l’abonnement
                        </button>
                        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200">
                            Résilier l’abonnement
                        </button>
                    </div>
                </div>
            )}
            {activeMenu === "produits" && (
                <>
                    <div className="overflow-x-auto hidden md:flex ml-60">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix (FCFA)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {produit.map((produit) => (
                                    <tr key={produit.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                                                    {produit.images && produit.images.length > 0 ? (
                                                        <img
                                                            className="h-full w-full object-cover"
                                                            src={`/storage/${produit.images[0].url}`}
                                                            alt={produit.nom}
                                                        />
                                                    ) : (
                                                        <FiImage className="h-full w-full text-gray-400 p-2" />
                                                    )}
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-[#071726]">{produit.nom}</div>
                                                    <div className="text-sm text-gray-500">{produit.categorie}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {produit.prix.toLocaleString()}
                                                {produit.reduction > 0 && (
                                                    <span className="ml-2 text-xs text-green-600">
                                                        (-{produit.reduction}%)
                                                    </span>
                                                )}
                                            </div>
                                            {produit.reduction > 0 && (
                                                <div className="text-xs text-gray-500 line-through">
                                                    {produit.prix_reduit?.toLocaleString()}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${produit.quantite > 5 ? 'bg-green-100 text-green-800' :
                                                produit.quantite > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {produit.quantite} en stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${produit.disponible === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {produit.disponible === 1 ? 'Disponible' : 'Indisponible'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => { setSelectedProduct(produit); setActiveTab('ajouter'); }}
                                                className="text-[#ec8d0c] hover:text-[#d97d0c] mr-3"
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(produit.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* mobile */}
                    <div className='p-4 grid grid-cols-2 bg-gray-100 md:hidden'>
                        {produit.map((produit) => (
                            <div key={produit.id} className='bg-white p-2 rounded-lg shadow-xs h-max w-max my-2 mx-1'>
                                <div className='p-5 mb-1 text-center bg-cover bg-center h-28'>
                                    <img src={`/storage/${produit.images[0].url}`} alt="" className='rounded w-[100%] h-[100%] object-cover ' />
                                </div>
                                <div className=''>
                                    <p className='text-center mb-2'>{produit.nom}</p>
                                    <div className='flex justify-between items-center space-x-5'>
                                        <span className={`text-xs p-1 rounded-sm ${produit.disponible === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {produit.disponible === 1 ? 'Disponible' : 'Indisponible'}
                                        </span>
                                        <span className='text-xs text-gray-400'>en stock:{produit.quantite}</span>
                                    </div>
                                    <div className='flex justify-between my-2'>
                                        <FiTrash2 className='inline m-2 text-red-700' />
                                        <FiEdit className='inline m-2 text-orange-500' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default AdminSeller