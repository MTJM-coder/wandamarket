import AlertMessage from "@/Layouts/AlertMessage";
import NavBar2 from "@/Layouts/NavBar2";
import SideBar2 from "@/Layouts/SideBar2";
import React, { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { router, usePage } from "@inertiajs/react";

const Commandes = () => {
  const {props}=usePage();
  const {flash}=props
  const orders=props.orders
 
  const [activeTab,setActiveTab]=useState("Commandes")
  const redirigerVers=(lien)=>{
    window.location.href=lien
  }

  return (
    <>
    <NavBar2/>
     <SideBar2 className="mt-0" activeTab={activeTab} setActiveTab={setActiveTab}/>
     <AlertMessage message={flash.success} type="success" />
      <AlertMessage message={flash.error} type="error" />
    <div className="md:ml-32 px-4 md:px-0 mt-24">
       
      <h1 className="font-bold text-2xl mb-5">Vos commandes</h1>
      <div className="border-b mb-5 md:text-end md:space-x-10  space-x-5">
        <button className="border-b-black border-b-2">Toutes</button>
        <button className="">en attente</button>
        <button className="">en cours</button>
        <button className="">Terminée</button> 
      </div>

      {orders.map((COMMANDE) => (
        <div key={COMMANDE.id} className="p-1 md:p-6 bg-gray-100">
              <div className="max-w-4xl mx-auto bg-white shadow rounded-2xl p-6">
                {/* En-tête commande */}
                <div className="flex flex-col md:flex-row justify-between text-sm text-gray-600 border-b pb-4">
                  <p className="font-medium text-yellow-600">Commande CMD{COMMANDE.id.toString().padStart(5, '0')}</p>
                  <p>Date : {new Date(COMMANDE.created_at).toLocaleDateString('fr-FR')}</p>
                  <p>Total : {COMMANDE.montant_total}FCFA</p>
                  <p>Vendu par : <span className="font-semibold">{COMMANDE.boutique?.nom}</span></p>
                </div>
        
                {/* Statut livraison */}
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border">
                  <p className="text-base font-semibold text-gray-800">{COMMANDE.etat}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <FiMapPin className="mr-2" />
                    <span>{COMMANDE.boutique?.ville} , {COMMANDE.boutique?.quartier}</span>
                    <a onClick={()=>router.get(`/buyer/order/detail/${COMMANDE.id}`)} className="cursor-pointer ml-3 text-blue-600 hover:underline">Suivre le colis</a>
                  </div>
                </div>
        
                {/* Produit */}
                <div className="flex items-start gap-4 mt-6">
                  <img
                    src={`/storage/${COMMANDE.commande_produits[0].produit.images[0].url}`}
                    alt="Produit"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{COMMANDE.article}</p>
                    <p className="text-sm text-gray-600">
                      Catégorie : {COMMANDE.commande_produits[0].produit?.categorie?.nom}, 
                      {COMMANDE.commande_produits[0].produit.couleur &&  
                        <span>Couleur :{" "}</span>
                      }
                      <span className="text-green-600 font-medium">{COMMANDE.couleur}</span>
                    </p>
                    <p className="text-sm text-gray-600">Quantité : {COMMANDE.commande_produits[0].quantite}</p>
                  </div>
                </div>
        
                {/* Actions */}
                <div className="flex justify-between items-center mt-6">
                  <button className="px-4 py-2 border rounded-full hover:bg-gray-100 transition">
                    Voir les détails
                  </button>
                  {/* <button className="px-4 py-2 border rounded-full hover:bg-gray-100 transition">
                    Plus d’actions
                  </button> */}
                </div>
              </div>
            </div>
      ))}
    </div>
    </>
  );
};

export default Commandes;
