import React from 'react'
import { FiMapPin, FiUser } from "react-icons/fi";
import SellerSideBar from '@/Layouts/sellerSideBar';
import NavBar2 from '@/Layouts/NavBar2';
import NavBar3 from '@/Layouts/NavBar3';

const SellerOrder = () => {
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
const [activeTab,setActiveTab]=React.useState('commandes');
  return (
    <div>
      <NavBar3 activeTab={activeTab} setActiveTab={setActiveTab} commandes={COMMANDES} />
      <SellerSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
    
    <div className="p-4 md:p-8 space-y-6 md:ml-32 mt-24">

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
            {commande.etat === "En attente de confirmation" && (
              <>
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">
                  Confirmer
                </button>
                <button className="px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200">
                  Annuler
                </button>
              </>
            )}
            {commande.etat === "Livrée" ? (
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
    </div>
  );
};

export default SellerOrder;
