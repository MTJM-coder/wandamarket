import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
  FiPlus, FiEdit, FiTrash2, FiPackage, FiBarChart2, 
  FiSettings, FiUsers, FiDollarSign, FiImage, FiSearch,
  FiEye, FiEyeOff, FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { FaStore } from 'react-icons/fa';

const MaBoutique = () => {
  // Données fictives pour la boutique
  const boutique = {
    id: 1,
    nom: "Mode Africaine by Aïcha",
    ville: "Abidjan",
    quartier: "Cocody",
    description: "Spécialisée en vêtements traditionnels africains modernes",
    telephone: "+225 07 54 32 10 98",
    email: "contact@modeafricaine.com",
    logo: "/images/boutiques/mode-africaine.jpg",
    statut: "active",
    date_creation: "2022-05-15"
  };

  // Données fictives pour les produits
  const [produits, setProduits] = useState([
    {
      id: 1,
      nom: "Robe Wax Femme",
      description: "Robe en wax 100% coton, modèle élégant",
      prix: 25000,
      categorie: "Vêtements",
      stock: 15,
      images: ["/images/produits/robe-wax.jpg"],
      statut: "actif",
      reduction: 0,
      date_ajout: "2023-01-10"
    },
    {
      id: 2,
      nom: "Chemise Homme en Bazin",
      description: "Chemise traditionnelle en bazin riche",
      prix: 18000,
      categorie: "Vêtements",
      stock: 8,
      images: ["/images/produits/chemise-bazin.jpg"],
      statut: "actif",
      reduction: 10,
      prix_reduit: 16200,
      date_ajout: "2023-02-05"
    },
    {
      id: 3,
      nom: "Sac à Main Africain",
      description: "Sac artisanal en cuir et tissus africains",
      prix: 15000,
      categorie: "Accessoires",
      stock: 0,
      images: ["/images/produits/sac-africain.jpg"],
      statut: "inactif",
      reduction: 0,
      date_ajout: "2023-03-20"
    }
  ]);

  // Données fictives pour les commandes
  const commandes = [
    {
      id: 1,
      numero: "CMD-2023-001",
      client: "Fatou Diop",
      date: "2023-04-15",
      montant: 43000,
      statut: "livrée",
      produits: [
        { id: 1, nom: "Robe Wax Femme", quantite: 1, prix: 25000 },
        { id: 2, nom: "Chemise Homme en Bazin", quantite: 1, prix: 18000 }
      ]
    },
    {
      id: 2,
      numero: "CMD-2023-002",
      client: "Jean Kouassi",
      date: "2023-04-18",
      montant: 18000,
      statut: "en cours",
      produits: [
        { id: 2, nom: "Chemise Homme en Bazin", quantite: 1, prix: 18000 }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState('produits');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Fonctions de gestion
  const handleDeleteProduct = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProduits(produits.filter(produit => produit.id !== id));
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData.entries());
    
    if (selectedProduct) {
      // Modification
      setProduits(produits.map(p => 
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      // Ajout
      const newProduct = {
        id: Math.max(...produits.map(p => p.id)) + 1,
        ...productData,
        stock: parseInt(productData.stock),
        prix: parseFloat(productData.prix),
        statut: "actif",
        date_ajout: new Date().toISOString().split('T')[0]
      };
      setProduits([...produits, newProduct]);
    }
    
    setSelectedProduct(null);
    setActiveTab('produits');
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Filtrage des produits
  const filteredProducts = produits.filter(produit =>
    produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-2xl font-bold">
            <span className="text-[#071726]">WANDA</span>
            <span className="text-[#ec8d0c]">MARKET</span>
          </Link>
          <Link href="/dashboard" className="text-[#071726] hover:text-[#ec8d0c] transition">
            Retour au tableau de bord
          </Link>
        </div>
      </div>

      {/* Boutique Header */}
      <div className="bg-[#071726] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-20 h-20 rounded-full bg-white overflow-hidden mr-6 flex items-center justify-center">
                {boutique.logo ? (
                  <img src={boutique.logo} alt={boutique.nom} className="w-full h-full object-cover" />
                ) : (
                  <FaStore className="text-3xl text-[#071726]" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{boutique.nom}</h1>
                <p className="text-gray-300">{boutique.ville}, {boutique.quartier}</p>
                <p className="text-sm text-gray-300 mt-1">{boutique.description}</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg shadow ${boutique.statut === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="font-medium">Statut: <span className="capitalize">{boutique.statut}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow p-4 h-fit">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('produits')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'produits' ? 'bg-[#071726] text-white' : 'text-[#071726] hover:bg-gray-100'}`}
              >
                <FiPackage className="mr-3" />
                Mes produits
              </button>
              <button
                onClick={() => { setSelectedProduct(null); setActiveTab('ajouter'); }}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'ajouter' ? 'bg-[#071726] text-white' : 'text-[#071726] hover:bg-gray-100'}`}
              >
                <FiPlus className="mr-3" />
                Ajouter un produit
              </button>
              <button
                onClick={() => setActiveTab('commandes')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'commandes' ? 'bg-[#071726] text-white' : 'text-[#071726] hover:bg-gray-100'}`}
              >
                <FiDollarSign className="mr-3" />
                Commandes
              </button>
              <button
                onClick={() => setActiveTab('statistiques')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'statistiques' ? 'bg-[#071726] text-white' : 'text-[#071726] hover:bg-gray-100'}`}
              >
                <FiBarChart2 className="mr-3" />
                Statistiques
              </button>
              <button
                onClick={() => setActiveTab('parametres')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'parametres' ? 'bg-[#071726] text-white' : 'text-[#071726] hover:bg-gray-100'}`}
              >
                <FiSettings className="mr-3" />
                Paramètres
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
            {/* Produits Tab */}
            {activeTab === 'produits' && (
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-xl font-bold text-[#071726]">Mes produits ({produits.length})</h2>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button 
                      onClick={() => { setSelectedProduct(null); setActiveTab('ajouter'); }}
                      className="flex items-center px-4 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition"
                    >
                      <FiPlus className="mr-2" />
                      Ajouter
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
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
                      {filteredProducts.map((produit) => (
                        <tr key={produit.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                                {produit.images && produit.images.length > 0 ? (
                                  <img className="h-full w-full object-cover" src={produit.images[0]} alt={produit.nom} />
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
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              produit.stock > 5 ? 'bg-green-100 text-green-800' : 
                              produit.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {produit.stock} en stock
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              produit.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {produit.statut === 'actif' ? 'Actif' : 'Inactif'}
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
              </div>
            )}

            {/* Ajouter/Modifier Produit Tab */}
            {activeTab === 'ajouter' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#071726] mb-6">
                  {selectedProduct ? 'Modifier un produit' : 'Ajouter un nouveau produit'}
                </h2>
                
                <form onSubmit={handleSaveProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit *</label>
                      <input
                        type="text"
                        name="nom"
                        defaultValue={selectedProduct?.nom || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        placeholder="Nom du produit"
                        required
                      />
                    </div>

                    {/* Catégorie */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                      <select 
                        name="categorie"
                        defaultValue={selectedProduct?.categorie || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        required
                      >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="Vêtements">Vêtements</option>
                        <option value="Accessoires">Accessoires</option>
                        <option value="Chaussures">Chaussures</option>
                        <option value="Artisanat">Artisanat</option>
                      </select>
                    </div>

                    {/* Prix */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA) *</label>
                      <input
                        type="number"
                        name="prix"
                        defaultValue={selectedProduct?.prix || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        placeholder="Prix en FCFA"
                        min="0"
                        step="100"
                        required
                      />
                    </div>

                    {/* Réduction */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Réduction (%)</label>
                      <input
                        type="number"
                        name="reduction"
                        defaultValue={selectedProduct?.reduction || '0'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantité en stock *</label>
                      <input
                        type="number"
                        name="stock"
                        defaultValue={selectedProduct?.stock || '0'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        placeholder="Quantité disponible"
                        min="0"
                        required
                      />
                    </div>

                    {/* Statut */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                      <select 
                        name="statut"
                        defaultValue={selectedProduct?.statut || 'actif'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                      >
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      name="description"
                      rows={4}
                      defaultValue={selectedProduct?.description || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                      placeholder="Décrivez votre produit en détail..."
                      required
                    ></textarea>
                  </div>

                  {/* Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Images du produit *</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#ec8d0c] hover:text-[#d97d0c] focus-within:outline-none">
                            <span>Téléverser des fichiers</span>
                            <input type="file" className="sr-only" multiple />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                        {selectedProduct?.images && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {selectedProduct.images.map((img, index) => (
                              <div key={index} className="relative w-20 h-20 border rounded-md overflow-hidden">
                                <img src={img} alt={`Produit ${index}`} className="w-full h-full object-cover" />
                                <button 
                                  type="button"
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('produits');
                        setSelectedProduct(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-[#071726] hover:bg-gray-50 transition"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c]"
                    >
                      {selectedProduct ? 'Mettre à jour' : 'Ajouter le produit'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Commandes Tab */}
            {activeTab === 'commandes' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#071726] mb-6">Commandes récentes</h2>
                <div className="space-y-4">
                  {commandes.map((commande) => (
                    <div key={commande.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                        onClick={() => toggleOrderDetails(commande.id)}
                      >
                        <div>
                          <h3 className="font-medium text-[#071726]">Commande #{commande.numero}</h3>
                          <p className="text-sm text-gray-600">{commande.client} • {commande.date}</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            commande.statut === 'livrée' ? 'bg-green-100 text-green-800' :
                            commande.statut === 'en cours' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {commande.statut}
                          </span>
                          <span className="ml-4 text-gray-400">
                            {expandedOrder === commande.id ? <FiChevronUp /> : <FiChevronDown />}
                          </span>
                        </div>
                      </div>
                      
                      {expandedOrder === commande.id && (
                        <div className="p-4 border-t border-gray-200">
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-700 mb-2">Produits commandés</h4>
                            <ul className="space-y-2">
                              {commande.produits.map((produit, index) => (
                                <li key={index} className="flex justify-between">
                                  <span>{produit.nom} × {produit.quantite}</span>
                                  <span>{produit.prix.toLocaleString()} FCFA</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-between border-t border-gray-200 pt-3">
                            <span className="font-medium">Total</span>
                            <span className="font-bold">{commande.montant.toLocaleString()} FCFA</span>
                          </div>
                          <div className="mt-4 flex justify-end space-x-3">
                            {commande.statut === 'en cours' && (
                              <>
                                <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                                  Marquer comme livrée
                                </button>
                                <button className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded hover:bg-red-200">
                                  Annuler la commande
                                </button>
                              </>
                            )}
                            <button className="px-3 py-1 bg-[#071726] text-white text-sm rounded hover:bg-[#0d2a40]">
                              Voir les détails
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statistiques Tab */}
            {activeTab === 'statistiques' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#071726] mb-6">Statistiques de la boutique</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Ventes ce mois</h3>
                    <p className="text-3xl font-bold text-[#071726]">24</p>
                    <p className="text-sm text-green-600 mt-1">↑ 12% vs mois dernier</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Revenus ce mois</h3>
                    <p className="text-3xl font-bold text-[#071726]">245,000 FCFA</p>
                    <p className="text-sm text-green-600 mt-1">↑ 8% vs mois dernier</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Produits vus</h3>
                    <p className="text-3xl font-bold text-[#071726]">1,245</p>
                    <p className="text-sm text-green-600 mt-1">↑ 23% vs mois dernier</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                  <h3 className="text-lg font-medium text-gray-500 mb-4">Performances des produits</h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    Graphique des ventes (intégrer un graphique ici)
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-500 mb-4">Produits les plus populaires</h3>
                  <div className="space-y-4">
                    {produits.slice(0, 3).map((produit) => (
                      <div key={produit.id} className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md overflow-hidden mr-4">
                          {produit.images && produit.images.length > 0 ? (
                            <img className="h-full w-full object-cover" src={produit.images[0]} alt={produit.nom} />
                          ) : (
                            <FiImage className="h-full w-full text-gray-400 p-2" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#071726]">{produit.nom}</h4>
                          <p className="text-sm text-gray-500">12 ventes ce mois</p>
                        </div>
                        <div className="text-[#071726] font-medium">
                          {produit.prix.toLocaleString()} FCFA
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Paramètres Tab */}
            {activeTab === 'parametres' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#071726] mb-6">Paramètres de la boutique</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la boutique *</label>
                      <input
                        type="text"
                        defaultValue={boutique.nom}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                      <input
                        type="text"
                        defaultValue={boutique.ville}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quartier *</label>
                      <input
                        type="text"
                        defaultValue={boutique.quartier}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                      <input
                        type="tel"
                        defaultValue={boutique.telephone}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email de contact *</label>
                      <input
                        type="email"
                        defaultValue={boutique.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
                      <input
                        type="url"
                        defaultValue="https://www.modeafricaine.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      rows={4}
                      defaultValue={boutique.description}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo de la boutique</label>
                    <div className="mt-1 flex items-center">
                      <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                        {boutique.logo ? (
                          <img src={boutique.logo} alt="Logo boutique" className="h-full w-full object-cover" />
                        ) : (
                          <FaStore className="h-full w-full text-gray-400 p-4" />
                        )}
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-lg text-[#071726] hover:bg-gray-50 transition mr-3"
                      >
                        Changer le logo
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c]"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaBoutique;