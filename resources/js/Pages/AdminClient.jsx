import AdminNavBar from '@/Layouts/AdminNavBar'
import React, { useState } from 'react'
import { Card } from '@/Components/ui/Card'
import { Head, useForm } from "@inertiajs/react";
import { FiDelete, FiEdit, FiEye, FiUserCheck, FiUserX, FiMapPin, FiShoppingBag, FiUser, FiChevronLeft, FiUsers, FiSearch, FiMail, FiCalendar, FiSettings, FiBox, FiPhone, FiMap, FiTrash2, FiShieldOff, FiShield } from 'react-icons/fi';

const AdminClient = () => {
    const clients=[
        { id: 1, nom: "Jean Dupont", email: "jean@example.com", telephone: "+237 698 45 32 10",ville:"Douala", quartier:"dakar", commandes: 12 ,created_at:"20/03/2025",updatet_at:"13/04/2025",etat:"actif"},
        { id: 2, nom: "Marie Claire", email: "marie@example.com", telephone: "+237 677 12 45 98",ville:"Douala", quartier:"dakar", commandes: 5,created_at:"10/04/2025",updatet_at:"13/04/2025",etat:"inactif" },
        { id: 3, nom: "Paul Messi", email: "paul@example.com", telephone: "+237 690 88 74 12",ville:"Douala", quartier:"dakar", commandes: 20,created_at:"02/04/2025",updatet_at:"13/04/2025",etat:"actif" },
   ];
    const handleBlock = () => {
        if (confirm("Voulez-vouz bloquer ce compte?")) {
            alert("compte bloqué")
        }
    }
    const COMMANDES = [
        {
            id: "#270238450501025537",
            date: "21-07-2025, 07:00",
            prix: "19,00 FCFA",
            vendeur: "Matango Shop",
            etat: "En attente de confirmation de livraison",
            adresse: "yassa,Douala",
            article: "DY-03 Montre Femme Quartz Mode avec Bracelet en Pierres Précieuses, Boucles d’oreilles et Bague",
            categorie: "Mode",
            couleur: "Vert",
            quantite: 10,
            imageUrl: "/wach.png",
        },
        {
            id: "#270238450501025538",
            date: "12-02-2025, 14:00",
            prix: "10 000 FCFA",
            vendeur: "Shopping Mall",
            etat: "Livrée",
            adresse: "Dakar Plateau, Douala,Cameroun",
            article: "Vêtement de femme",
            categorie: "Mode",
            couleur: "Rouge",
            quantite: 2,
            imageUrl: "/dressGirl.png",
        },
    ];
    const [active, setActive] = useState("clients")
    const [activebtn, setActivebtn] = useState(null)
    const clientsInactifs=clients.filter(client=>client.etat=="inactif").length
    return (
        <div>
            <AdminNavBar active="clients" setActive={setActive} />
            {!activebtn && (
                <div className="p-6 bg-white rounded-lg shadow-md md:ml-60">
                    <div className='mb-6 mt-11 md:mt-0'>
                        <h2 className="text-2xl font-bold flex items-center mb-1 bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-200 bg-clip-text text-transparent "><span className='inline-block bg-yellow-300 p-2 rounded mr-4 text-white'><FiUsers className='' /></span> <p className='flex flex-col'> <span>Gestion des Clients</span> <span className='text-xs text-black'>Gerer efficacement vos clients ici</span></p></h2>
                        <div className='flex md:block gap-3'>
                            <div className='flex items-center border w-max px-3 rounded-md '>
                                <FiSearch className='text-gray-400' />
                                <input
                                    type="search"
                                    placeholder="Rechercher un client par nom ou email"
                                    className="h-8 px-3 text-xs bg-white rounded-md border-none "
                                />

                            </div>
                            <button className='bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 text-white px-2 rounded-md md:mt-2 text-sm py-1'>Valider</button>
                        </div>
                    </div>
                    <div className='flex mb-6 gap-5'>
                        <div className='bg-white flex items-center gap-5 shadow-md p-5 rounded'>
                            <div className='bg-green-700 p-3 rounded text-white'><FiUsers /></div>
                            <div className='flex flex-col'>
                                <span className='text-sm'>Total client</span>
                                <span className='font-bold'>{clients.length}</span>

                            </div>

                        </div>
                        <div className='bg-white flex items-center gap-5 shadow-md p-5 rounded'>
                            <div className='bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 p-3 rounded text-white'><FiUserCheck /></div>
                            <div className='flex flex-col'>
                                <span className='text-sm'>client regulier</span>
                                <span className='font-bold'>02</span>

                            </div>

                        </div>
                        <div className='bg-white flex items-center gap-5 shadow-md p-5 rounded'>
                            <div className='bg-gradient-to-r from-red-600 via-red-500 to-red-400 p-3 rounded text-white'><FiUserX /></div>
                            <div className='flex flex-col'>
                                <span className='text-sm'>client désactivé</span>
                                <span className='font-bold'>{clientsInactifs}</span>

                            </div>

                        </div>

                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-x-2 border-collapse border border-gray-200 overflow-auto">
                            <thead>
                                <tr className="bg-gray-100 md:text-inherit text-xs">
                                    <th className="tracking-wider px-2 py-4 text-left  items-center">
                                        <FiUser className="inline mr-2 text-blue-300" />Details client
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
                               {clients.map((client)=>
                                 <tr>
                                    <td className="px-2 py-4 text-left">
                                        <p className="font-bold md:text-xl ">{client.nom}</p>
                                        <p className="text-xs p-2 border w-max m-2 rounded bg-gray-100">ID:{client.id}</p>
                                    </td>
                                    <td className="text-xs text-gray-600 space-y-2 font-semibold px-2 py-4 text-left">
                                        <p>
                                            <FiMail className="inline" /> <span>{client.email}</span>
                                        </p>
                                        <p>
                                            <FiPhone className="inline" /> <span>{client.telephone}</span>
                                        </p>
                                        <p>
                                            <FiMapPin className="inline" /> <span>{client.ville}, {client.quartier}</span>
                                        </p>
                                    </td>
                                    <td className="space-y-1 px-2 py-4 text-left">
                                       <p className={`text-sm px-5  rounded w-max ${client.etat=="inactif"?"bg-red-200 text-red-700":"bg-green-300 text-green-700"} `}>{client.etat}</p>
                                    </td>
                                    <td className="space-y-1 px-2 py-4 text-left">
                                        <p className="text-xs">
                                            <span className="font-bold">Inscris: </span><span>{client.created_at}</span>
                                        </p>
                                        <p className="text-xs">
                                            <span className="font-bold">Modifié: </span><span>{client.updatet_at}</span>
                                        </p>
                                    </td>
                                    <td className="px-2 py-4 text-left">
                                        <div className="flex gap-3 md:gap-5">
                                            {client.etat=="actif" ? (
                                            <FiShieldOff className="hover:text-orange-500 cursor-pointer" />
                                            ):
                                            <FiShield className="hover:text-orange-500 cursor-pointer"/>
                                            }
                                            <FiTrash2 className="hover:text-red-500 cursor-pointer" />
                                            
                                        </div>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>
            )}
            {activebtn == "commandes" && (
                <div className='md:ml-60 mt-14 md:mt-0'>
                    <div className='flex justify-end fixed bottom-0 md:top-0  right-0'>
                        <button className='border p-2 rounded bg-gray-300 shadow-md' onClick={() => setActivebtn(null)}><FiChevronLeft className='inline' /> Retour</button>
                    </div>
                    {COMMANDES.map((COMMANDE) => (
                        <div key={COMMANDE.id} className="p-1 md:p-6 bg-gray-100">
                            <div className="max-w-4xl mx-auto bg-white shadow rounded-2xl p-6">
                                {/* En-tête commande */}
                                <div className="flex flex-col md:flex-row justify-between text-sm text-gray-600 border-b pb-4">
                                    <p className="font-medium text-yellow-600">Commande {COMMANDE.id}</p>
                                    <p>Date : {COMMANDE.date}</p>
                                    <p>Total : {COMMANDE.prix}</p>
                                    <p>Vendu par : <span className="font-semibold">{COMMANDE.vendeur}</span></p>
                                </div>

                                {/* Statut livraison */}
                                <div className="mt-4 p-4 bg-gray-50 rounded-xl border">
                                    <p className="text-base font-semibold text-gray-800">{COMMANDE.etat}</p>
                                    <div className="flex items-center mt-2 text-sm text-gray-600">
                                        <FiMapPin className="mr-2" />
                                        <span>{COMMANDE.adresse}</span>
                                        <a href="#" className="ml-3 text-blue-600 hover:underline">Suivre le colis</a>
                                    </div>
                                </div>

                                {/* Produit */}
                                <div className="flex items-start gap-4 mt-6">
                                    <img
                                        src={COMMANDE.imageUrl}
                                        alt="Produit"
                                        className="w-20 h-20 object-cover rounded-lg border"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">{COMMANDE.article}</p>
                                        <p className="text-sm text-gray-600">
                                            Catégorie : {COMMANDE.categorie}, Couleur :{" "}
                                            <span className="text-green-600 font-medium">{COMMANDE.couleur}</span>
                                        </p>
                                        <p className="text-sm text-gray-600">Quantité : {COMMANDE.quantite}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-between items-center mt-6">
                                    <button className="px-4 py-2 border rounded-full hover:bg-gray-100 transition">
                                        Voir les détails
                                    </button>
                                    <button className="px-4 py-2 border rounded-full hover:bg-gray-100 transition">
                                        Plus d’actions ⌄
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default AdminClient