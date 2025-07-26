import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
  FiHeart, FiShoppingCart, FiEye, FiTrash2, 
  FiChevronLeft, FiShare2, FiFilter 
} from 'react-icons/fi';
import AuthenticatedLayout from './AuthenticatedLayout';

const Favoris = () => {
  // Données fictives pour les produits favoris
  const [favoris, setFavoris] = useState([
    {
      id: 1,
      nom: "Robe Wax Femme",
      boutique: "Mode Africaine by Aïcha",
      prix: 25000,
      prix_reduit: 22000,
      reduction: 12,
      image: "/images/produits/robe-wax.jpg",
      en_stock: true,
      note: 4.5,
      avis: 24
    },
    {
      id: 2,
      nom: "Sac à Main Africain",
      boutique: "Artisanat Ivoirien",
      prix: 18000,
      image: "/images/produits/sac-africain.jpg",
      en_stock: false,
      note: 4.2,
      avis: 18
    },
    {
      id: 3,
      nom: "Statue Baoulé",
      boutique: "Art Traditionnel",
      prix: 35000,
      image: "/images/produits/statue-baoule.jpg",
      en_stock: true,
      note: 4.8,
      avis: 32
    }
  ]);

  // États pour les filtres
  const [filtreDisponible, setFiltreDisponible] = useState(false);
  const [tri, setTri] = useState('recent');

  // Fonctions de gestion
  const supprimerFavori = (id) => {
    if (confirm('Retirer ce produit de vos favoris ?')) {
      setFavoris(favoris.filter(produit => produit.id !== id));
    }
  };

  const ajouterAuPanier = (produit) => {
    alert(`${produit.nom} ajouté au panier`);
    // Ici, vous ajouteriez la logique pour ajouter au panier
  };

  // Appliquer les filtres
  const produitsFiltres = favoris.filter(produit => {
    if (filtreDisponible && !produit.en_stock) return false;
    return true;
  }).sort((a, b) => {
    if (tri === 'prix-croissant') return a.prix - b.prix;
    if (tri === 'prix-decroissant') return b.prix - a.prix;
    if (tri === 'note') return b.note - a.note;
    return 0; // Par défaut, ordre d'ajout
  });

  return (
    <AuthenticatedLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/produit" className="flex items-center text-[#071726] hover:text-[#ec8d0c] transition">
              <FiChevronLeft className="mr-1" />
              Retour
            </Link>
            <h1 className="text-xl font-bold text-center">
              <span className="text-[#071726]">Mes </span>
              <span className="text-[#ec8d0c]">Favoris</span>
            </h1>
            <div className="w-6"></div> {/* Pour l'équilibrage */}
          </div>
        </div>
      </div>

      {/* Barre de filtres */}
      <div className="container mx-auto px-4 py-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setFiltreDisponible(!filtreDisponible)}
              className={`flex items-center px-3 py-1 rounded-full text-sm ${
                filtreDisponible 
                  ? 'bg-[#071726] text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <FiFilter className="mr-1" />
              Disponibles
            </button>

            <select 
              value={tri}
              onChange={(e) => setTri(e.target.value)}
              className="border border-gray-300 rounded-full px-3 py-1 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#ec8d0c]"
            >
              <option value="recent">Plus récents</option>
              <option value="prix-croissant">Prix croissant</option>
              <option value="prix-decroissant">Prix décroissant</option>
              <option value="note">Meilleures notes</option>
            </select>
          </div>

          <p className="text-sm text-gray-600">
            {produitsFiltres.length} {produitsFiltres.length > 1 ? 'produits' : 'produit'}
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-6">
        {produitsFiltres.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produitsFiltres.map(produit => (
              <div key={produit.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                {/* Image du produit */}
                <div className="relative">
                  <img 
                    src={produit.image} 
                    alt={produit.nom} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300?text=Image+non+disponible';
                    }}
                  />
                  {produit.reduction && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{produit.reduction}%
                    </div>
                  )}
                </div>

                {/* Détails du produit */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#071726]">{produit.nom}</h3>
                      <p className="text-sm text-gray-500">{produit.boutique}</p>
                    </div>
                    <button 
                      onClick={() => supprimerFavori(produit.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiHeart className="fill-current" />
                    </button>
                  </div>

                  {/* Prix et note */}
                  <div className="mt-2 flex justify-between items-center">
                    <div>
                      {produit.prix_reduit ? (
                        <>
                          <span className="font-bold text-[#ec8d0c]">
                            {produit.prix_reduit.toLocaleString()} FCFA
                          </span>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            {produit.prix.toLocaleString()} FCFA
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-[#071726]">
                          {produit.prix.toLocaleString()} FCFA
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm ml-1 text-gray-700">
                        {produit.note} ({produit.avis})
                      </span>
                    </div>
                  </div>

                  {/* Disponibilité */}
                  <div className={`mt-2 text-sm ${
                    produit.en_stock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {produit.en_stock ? 'En stock' : 'Rupture de stock'}
                  </div>

                  {/* Boutons d'action */}
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => ajouterAuPanier(produit)}
                      disabled={!produit.en_stock}
                      className={`flex-1 flex items-center justify-center py-2 px-3 rounded ${
                        produit.en_stock
                          ? 'bg-[#ec8d0c] text-white hover:bg-[#d97d0c]'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      } transition`}
                    >
                      <FiShoppingCart className="mr-2" />
                      Ajouter
                    </button>
                    <Link 
                      href={`/produits/${produit.id}`}
                      className="flex items-center justify-center py-2 px-3 border border-[#071726] text-[#071726] rounded hover:bg-gray-100 transition"
                    >
                      <FiEye className="mr-2" />
                      Voir
                    </Link>
                    <button className="flex items-center justify-center py-2 px-3 border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition">
                      <FiShare2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiHeart className="text-gray-400 w-10 h-10" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">Aucun produit favori</h3>
            <p className="text-gray-500 mt-1">
              {filtreDisponible 
                ? "Aucun produit disponible dans vos favoris"
                : "Vous n'avez encore aucun produit dans vos favoris"}
            </p>
            <Link
              href="/boutiques"
              className="mt-4 inline-flex items-center px-4 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition"
            >
              Découvrir les boutiques
            </Link>
          </div>
        )}
      </div>
    </div>
    </AuthenticatedLayout>
  );
};

export default Favoris;