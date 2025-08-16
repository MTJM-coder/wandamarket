import NavBar2 from "@/Layouts/NavBar2";
import SideBar2 from "@/Layouts/SideBar2";
import React from "react";
import { FiMapPin } from "react-icons/fi";

const Commandes = () => {
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

  return (
    <>
    <NavBar2/>
     <SideBar2 className="mt-0"/>
    <div className="md:ml-32 px-4 md:px-0 mt-24">
       
      <h1 className="font-bold text-2xl mb-5">Vos commandes</h1>
      <div className="border-b mb-5 text-end space-x-10">
        <button className="border-b-black border-b-2">Toutes</button>
        <button className="">En attente</button>
        <button className="">En cours</button>
        <button className="">Livrée</button>
      </div>

      {COMMANDES.map((COMMANDE) => (
        <div key={COMMANDE.id} className="p-6 bg-gray-100">
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
    </>
  );
};

export default Commandes;
