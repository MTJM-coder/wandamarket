import React from 'react'
import { useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import SellerSideBar from '@/Layouts/sellerSideBar';
import NavBar3 from '@/Layouts/NavBar3';

const SellerProducts = ({ categorie }) => {
    const [activeTab, setActiveTab] = useState('produits');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { props } = usePage();
    const produit=props.produits;

    // Fonctions de gestion
    const handleDeleteProduct = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            router.delete(`/produit/${id}`);

        }
    };
    const handleUpdateBoutique = (e) => {

    }
    const handleSaveProduct = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (selectedProduct) {
            // Cas modification
            router.post('/produit/update/' + selectedProduct.id, formData, {
                forceFormData: true,
                onSuccess: () => {
                    setSelectedProduct(null);
                    setActiveTab('produits');
                }
            });
        } else {
            // Cas ajout
            router.post('/produit/save', formData, {
                forceFormData: true,
                onSuccess: () => {
                    setSelectedProduct(null);
                    setActiveTab('produits');
                }
            });
        }
    };

    return (
        <div>
            <NavBar3 activeTab={activeTab} setActiveTab={setActiveTab} produit={produit}/>
           {activeTab =='produits' && (
            <div>
                <SellerSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
             <div className="md:p-6 md:ml-72">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:mt-24">
                    {/* <h2 className="text-xl font-bold text-[#071726]">Mes produits ({produit.length})</h2> */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
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

                <div className="overflow-x-auto hidden md:flex">
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
                                                        src={`/storage/${produit.images[0].url}`} ne
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
              <div className="p-4 grid grid-cols-2 gap-4 bg-gray-100 md:hidden">
  {produit.map((produit) => (
    <div
      key={produit.id}
      className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center"
    >
      {/* Image produit */}
      <div className="w-full h-28 mb-3">
        <img
          src={`/storage/${produit.images[0].url}`}
          alt={produit.nom}
          className="rounded-lg w-full h-full object-cover"
        />
      </div>

      {/* Nom produit */}
      <p className="text-center text-sm font-medium text-gray-700 mb-2 truncate w-full">
        {produit.nom}
      </p>

      {/* Disponibilité & Stock */}
      <div className="flex justify-between items-center w-full mb-3">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            produit.disponible === 1
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {produit.disponible === 1 ? "Disponible" : "Indisponible"}
        </span>
        <span className="text-xs text-gray-500">
          Stock : {produit.quantite}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-between w-full">
        <button onClick={() => handleDeleteProduct(produit.id)} className="flex-1 flex justify-center py-2 text-red-600 hover:text-red-800 transition">
          <FiTrash2 className="text-lg" />
        </button>
        <button onClick={() => { setSelectedProduct(produit); setActiveTab('ajouter'); }} className="flex-1 flex justify-center py-2 text-orange-500 hover:text-orange-700 transition">
          <FiEdit className="text-lg" />
        </button>
      </div>
    </div>
  ))}
</div>


              
            </div>
            </div>
            )}
            {activeTab === 'ajouter' && (
                <div className="p-6 mt-24 md:ml-24">
                    {/* {succes && (
                                <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 border border-green-300">
                                  {succes}
                                </div>
                              )} */}
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
                                    defaultValue={selectedProduct?.categorie?.nom || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                                    required
                                >
                                    <option value="">Sélectionnez une catégorie</option>
                                   
                                    {categorie.map((categorie) => (
                                        <option value={categorie.id}>{categorie.nom}</option>
                                      ))}
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

                                    required
                                />
                            </div>

                            {/* Réduction */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prix avant la réduction(optionnel) </label>
                                <input
                                    type="number"
                                    name="reduction"
                                    defaultValue={selectedProduct?.reduction || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                                    placeholder="0"
                                    min="0"

                                />
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantité en stock (optionnel)</label>
                                <input
                                    type="number"
                                    name="stock"
                                    defaultValue={selectedProduct?.quantite || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                                    placeholder="Quantité disponible"
                                    min="0"

                                />
                            </div>

                            {/* Statut */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                                <select
                                    name="disponible"
                                    defaultValue={selectedProduct?.disponible || 'disponible'}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                                >
                                    <option value="1">Disponible</option>
                                    <option value="0">Indisponible</option>
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
                                            <input type="file" className="sr-only" name='image[]' multiple />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                                    {selectedProduct?.images && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {selectedProduct.images.map((img, index) => (
                                                <div key={index} className="relative w-20 h-20 border rounded-md overflow-hidden">
                                                    <img src={`/storage/${img.url}`} alt={`Produit ${index}`} className="w-full h-full object-cover" />
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
        </div>
    )
}

export default SellerProducts