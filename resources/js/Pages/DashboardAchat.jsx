import React from 'react';
import { Link } from '@inertiajs/react';
import { 
  FiShoppingBag, FiSearch, FiShoppingCart, FiPlus,  FiPackage, FiCreditCard, FiTruck, 
  FiStar, FiHeart, FiClock, FiBarChart2 
} from 'react-icons/fi';
import { FaChartLine, FaWallet } from 'react-icons/fa';
import AuthenticatedLayout from './AuthenticatedLayout';
import {usePage} from '@inertiajs/react';



const DashboardAchat = () => {
  const {props}=usePage();
const commandeTotale= props.commandeTotal;
const commandeEncour=props.commandeEncour;
const commadeAnnule=props.commadeAnnule;
const commandeLivre=props.commandeLivre;
const mtDepense=props.mtDepense;
const favoris =props.favoris;
const avis = props.avis;
const commandeRecente=props.commandeRecente;
  // Données fictives
  const stats = {
    commandes: {
      total: 12,
      enCours: 3,
      livrees: 8,
      annulees: 1
    },
    depenses: {
      total: 245000,
      moisEnCours: 85000,
      moisPrecedent: 160000
    },
   
    avisDonnes: 5,
    adresses: 2,
    paiements: [
      { type: 'Mobile Money', derniersChiffres: '7890' },
      { type: 'Carte Visa', derniersChiffres: '4213' }
    ]
  };

  const commandesRecentes = [
    {
      id: 1,
      numero: 'CMD-2023-045',
      boutique: 'Mode Africaine',
      date: '15/04/2023',
      montant: 45000,
      statut: 'Livrée',
      produits: [
        { nom: 'Robe Wax', prix: 25000, quantite: 1 },
        { nom: 'Sac à Main', prix: 20000, quantite: 1 }
      ]
    },
    {
      id: 2,
      numero: 'CMD-2023-046',
      boutique: 'Artisanat ivoirien',
      date: '18/04/2023',
      montant: 18000,
      statut: 'En cours',
      produits: [
        { nom: 'Statue Baoulé', prix: 18000, quantite: 1 }
      ]
    }
  ];

  const suggestions = [
    {
      id: 1,
      nom: 'Boucles d\'Oreilles en Or',
      boutique: 'Bijoux Traditionnels',
      prix: 35000,
      image: '/images/produits/boucles-or.jpg'
    },
    {
      id: 2,
      nom: 'Sandales en Cuir',
      boutique: 'Maroquinerie Africaine',
      prix: 22000,
      image: '/images/produits/sandales-cuir.jpg'
    }
  ];

  // Calcul des pourcentages
  const evolutionDepenses = ((stats.depenses.moisEnCours - stats.depenses.moisPrecedent) / stats.depenses.moisPrecedent * 100).toFixed(1);

  return (
    <AuthenticatedLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-2xl font-bold">
            <span className="text-[#071726]">WANDA</span>
            <span className="text-[#ec8d0c]">MARKET</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/recherche" className="text-[#071726] hover:text-[#ec8d0c] transition">
              <FiSearch className="w-5 h-5" />
            </Link>
            <Link href="/panier" className="text-[#071726] hover:text-[#ec8d0c] transition">
              <FiShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#071726] mb-2">Tableau de bord acheteur</h1>
        <p className="text-gray-600 mb-6">Vos statistiques et activités récentes</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Commandes totales */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#ec8d0c]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Commandes totales</p>
                <p className="text-2xl font-bold text-[#071726]">{commandeTotale}</p>
              </div>
              <div className="p-3 rounded-full bg-[#071726] text-white">
                <FiShoppingBag className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex space-x-4">
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                {commandeLivre} livrées
              </span>
              <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {commandeEncour} en cours
              </span>
            </div>
          </div>

          {/* Dépenses */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#071726]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Dépenses totales</p>
                <p className="text-2xl font-bold text-[#071726]">
                  {mtDepense.toLocaleString()} FCFA
                </p>
              </div>
              <div className="p-3 rounded-full bg-[#ec8d0c] text-white">
                <FaWallet className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className={`text-sm ${evolutionDepenses > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {evolutionDepenses > 0 ? '↑' : '↓'} {Math.abs(evolutionDepenses)}% vs mois dernier
              </p>
            </div>
          </div>

          {/* Favoris */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Produits favoris</p>
                <p className="text-2xl font-bold text-[#071726]">{favoris}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FiHeart className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/favoris" className="text-sm text-purple-600 hover:underline">
                Voir mes favoris
              </Link>
            </div>
          </div>

          {/* Avis donnés */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avis donnés</p>
                <p className="text-2xl font-bold text-[#071726]">{avis}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FiStar className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/avis" className="text-sm text-yellow-600 hover:underline">
                Voir mes avis
              </Link>
            </div>
          </div>
        </div>

        {/* Deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Commandes récentes */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#071726] flex items-center">
                <FiPackage className="mr-2 text-[#ec8d0c]" />
                Commandes récentes
              </h2>
              <Link href="/commandes" className="text-sm text-[#ec8d0c] hover:underline">
                Voir toutes
              </Link>
            </div>

            <div className="space-y-4">
            
              {commandeRecente.map(commande => (
                <div key={commande.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#071726]">Commande #CMD-{String(commande.id).padStart(4, '0')}</h3>
                      <p className="text-sm text-gray-600">{commande.boutique.nom} • {new Date(commande.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{commande.montant_total.toLocaleString()} FCFA</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        commande.etat === 'Livrée' ? 'bg-green-100 text-green-800' :
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
      <span>{items.produit.prix.toLocaleString()} FCFA</span>
    </li>
  )
))}
                    </ul>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <Link 
                      href={`/commandes/${commande.id}`}
                      className="text-sm px-3 py-1 bg-[#071726] text-white rounded hover:bg-[#0d2a40] transition"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Paiements & Suggestions */}
          <div className="space-y-6">
            {/* Méthodes de paiement */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#071726] flex items-center">
                  <FiCreditCard className="mr-2 text-[#ec8d0c]" />
                  Mes moyens de paiement
                </h2>
                <Link href="/paiements" className="text-sm text-[#ec8d0c] hover:underline">
                  Gérer
                </Link>
              </div>

              <div className="space-y-3">
                {stats.paiements.map((paiement, index) => (
                  <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <div className="p-2 bg-gray-100 rounded-full mr-3">
                      <FiCreditCard className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{paiement.type}</p>
                      <p className="text-sm text-gray-500">•••• •••• •••• {paiement.derniersChiffres}</p>
                    </div>
                  </div>
                ))}

                <button className="w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#ec8d0c] hover:text-[#ec8d0c] transition">
                  <FiPlus className="mr-2" />
                  Ajouter un moyen de paiement
                </button>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-[#071726] flex items-center mb-4">
                <FaChartLine className="mr-2 text-[#ec8d0c]" />
                Suggestions pour vous
              </h2>

              <div className="space-y-4">
                {suggestions.map(produit => (
                  <Link 
                    key={produit.id}
                    href={`/produits/${produit.id}`}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4">
                      <img 
                        src={produit.image} 
                        alt={produit.nom} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/80?text=Image+non+disponible';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#071726]">{produit.nom}</h3>
                      <p className="text-sm text-gray-500">{produit.boutique}</p>
                      <p className="font-bold text-[#071726]">{produit.prix.toLocaleString()} FCFA</p>
                    </div>
                  </Link>
                ))}

                <div className="text-center mt-4">
                  <Link 
                    href="/suggestions" 
                    className="text-sm text-[#ec8d0c] hover:underline"
                  >
                    Voir plus de suggestions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-bold text-[#071726] flex items-center mb-6">
            <FiBarChart2 className="mr-2 text-[#ec8d0c]" />
            Mes statistiques d'achat
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                <FiShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-500">Commandes ce mois</p>
              <p className="text-xl font-bold text-[#071726]">3</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                <FiTruck className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-500">Livraisons réussies</p>
              <p className="text-xl font-bold text-[#071726]">11</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-2">
                <FiClock className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-500">Délai moyen</p>
              <p className="text-xl font-bold text-[#071726]">2.5 jours</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
                <FiStar className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-500">Note moyenne donnée</p>
              <p className="text-xl font-bold text-[#071726]">4.2/5</p>
            </div>
          </div>

          <div className="mt-8 h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            Graphique de vos achats sur 6 mois (intégrer un graphique ici)
          </div>
        </div>
      </div>
    </div>
    </AuthenticatedLayout>
  );
};

export default DashboardAchat;