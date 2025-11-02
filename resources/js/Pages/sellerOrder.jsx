import React from 'react'
import { FiMapPin, FiUser } from "react-icons/fi";
import SellerSideBar from '@/Layouts/sellerSideBar';
import NavBar2 from '@/Layouts/NavBar2';
import NavBar3 from '@/Layouts/NavBar3';
import { router, usePage } from '@inertiajs/react';

const SellerOrder = () => {
  const { props } = usePage()
  const orders = props.orders
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

  const handleCancelOrder=(id)=>{
    if (confirm("Voulez-vous anniler cette commande?")){
      router.get(`/seller/${id}/cancel/order`)

    }
  }
  const [activeTab, setActiveTab] = React.useState('commandes');
  return (
    <div>
      <NavBar3 activeTab={activeTab} setActiveTab={setActiveTab} commandes={COMMANDES} />
      <SellerSideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-4 md:p-8 space-y-6 md:ml-72 md:mt-16 mb-12">

        {orders.map((commande) => (
          <div
            key={commande.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden border"
          >
            {/* En-tête */}
            <div className=" flex justify-between gap-2 md:gap-6 p-4 border-b text-sm">
              <div className='flex flex-col md:flex-row  justify-between gap-2'>
              <p className="font-semibold text-[#071726]">Commande #{commande.id}</p>
              <p>Date : <span className="text-gray-700">{new Date(commande.created_at).toLocaleDateString('fr-FR')}</span></p>
              <p>Total : <span className="font-bold">{commande.montant_total} FCFA</span></p>
              </div>
              <div>
  <p
    className={`px-3 py-1 rounded-full text-xs font-semibold w-fit
      ${
        commande.etat === "en attente"
          ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
          :commande.etat=="en cours"
          ? "bg-blue-100 text-blue-700 border border-blue-300"
          : commande.etat === "livrée"
          ? "bg-green-100 text-green-700 border border-green-300"
          : commande.etat === "annulée"
          ? "bg-red-100 text-red-700 border border-red-300"
          : "bg-gray-100 text-gray-700 border border-gray-300"
      }`}
  >
    {commande.etat}
  </p>
</div>
            </div>


            {/* Acheteur + Adresse */}
            <div className="p-4 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FiUser />
                <span>Acheteur : <strong>{commande.user.nom}</strong></span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <FiMapPin className="mr-2" />
                <span>{commande.user.ville},{commande.user.quartier}</span>
              </div>
            </div>

            {/* Produit */}
            {/* Produits */}
            <div className="p-4 space-y-4">
              {commande.commande_produits.map((cp, index) => (
                <div key={index} className="flex items-start gap-4 border-b pb-3 last:border-0">
                  <img
                    src={`/storage/${cp.produit?.images[0].url}`}
                    alt={cp.produit.nom}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{cp.produit.nom}</p>
                    <p className="text-sm text-gray-600">
                      Catégorie : {cp.produit.categorie} • Couleur :{" "}
                      <span className="text-green-600 font-medium">{cp.produit.couleur}</span>
                    </p>
                    <p className="text-sm text-gray-600">Quantité : {cp.quantite}</p>
                  </div>
                </div>
              ))}
            </div>


            {/* Actions */}
            <div className="p-4 flex flex-wrap justify-end gap-3 border-t">
              {commande.etat === "en attente" && (
                <>
                  {/* <button onClick={()=>router.get(`/seller/${commande.id}/confirm/order`)} className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">
                    Confirmer
                  </button> */}
                  <button onClick={()=>handleCancelOrder(commande.id)} className="px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200">
                    Annuler
                  </button>
                </>
              )}
              
              <button onClick={() => router.get(`/seller/${commande.id}/order`)} className="px-4 py-2 border rounded-full hover:bg-gray-100">
                Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrder;
