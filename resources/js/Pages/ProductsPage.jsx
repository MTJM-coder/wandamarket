import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
  FiSearch, FiFilter, FiGrid, FiList, FiStar, FiShoppingCart,
  FiChevronDown, FiHeart, FiShare2, FiRefreshCw, FiX
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import AuthenticatedLayout from './AuthenticatedLayout';
// Données fictives pour les produits
const fakeProducts = [
  {
    id: 1,
    name: "Robes Africaines en Wax",
    description: "Robe traditionnelle en tissu wax de haute qualité, confortable et élégante",
    price: 25000,
    boutique_id: 1,
    boutique_name: "Mode Africaine",
    image: "sac1.webp",
    quantite: 10,
    disponible: true,
    reduction: 15,
    prix_reduit: 21250,
    categorie_id: 1,
    categorie_name: "Mode",
    rating: 4.5,
    slug: "robes-africaines-en-wax"
  },
  {
    id: 2,
    name: "Sacs en Raphia Artisanal",
    description: "Sac fabriqué à la main avec des matériaux naturels, parfait pour l'été",
    price: 15000,
    boutique_id: 2,
    boutique_name: "Artisanat Local",
    image: "sac2.webp",
    quantite: 5,
    disponible: true,
    reduction: 0,
    prix_reduit: 15000,
    categorie_id: 2,
    categorie_name: "Accessoires",
    rating: 4.2,
    slug: "sacs-en-raphia-artisanal"
  },
  {
    id: 3,
    name: "Miel Pur de l'Ouest",
    description: "Miel 100% naturel récolté dans les forêts de l'Ouest Cameroun",
    price: 5000,
    boutique_id: 3,
    boutique_name: "Produits Naturels",
    image: "miel.webp",
    quantite: 20,
    disponible: true,
    reduction: 10,
    prix_reduit: 4500,
    categorie_id: 3,
    categorie_name: "Alimentation",
    rating: 4.8,
    slug: "miel-pur-ouest"
  },
  {
    id: 4,
    name: "Statues en Bois Sculpté",
    description: "Sculpture artisanale en bois d'ébène, pièce unique",
    price: 35000,
    boutique_id: 2,
    boutique_name: "Artisanat Local",
    image: "sculture.webp",
    quantite: 3,
    disponible: true,
    reduction: 20,
    prix_reduit: 28000,
    categorie_id: 4,
    categorie_name: "Décoration",
    rating: 4.7,
    slug: "statues-bois-sculpte"
  }
];

// Données fictives pour les catégories
const fakeCategories = [
  { id: 1, name: "Mode", product_count: 12 },
  { id: 2, name: "Accessoires", product_count: 8 },
  { id: 3, name: "Alimentation", product_count: 15 },
  { id: 4, name: "Décoration", product_count: 5 },
  { id: 5, name: "Cosmétiques", product_count: 7 }
];

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortOption, setSortOption] = useState('popular');
  const [filteredProducts, setFilteredProducts] = useState(fakeProducts);

  // Appliquer les filtres
  useEffect(() => {
    let results = [...fakeProducts];
    
    // Filtre par recherche
    if (searchQuery) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtre par catégorie
    if (selectedCategory) {
      results = results.filter(product => 
        product.categorie_id === selectedCategory
      );
    }
    
    // Filtre par prix
    results = results.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Tri des résultats
    switch(sortOption) {
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        results.sort((a, b) => b.id - a.id); // Utilisation de l'ID comme proxy pour la date
        break;
      default: // 'popular'
        results.sort((a, b) => b.quantite - a.quantite); // Utilisation de la quantité comme proxy pour la popularité
    }
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, priceRange, sortOption]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 100000]);
    setSortOption('popular');
  };

  // Composant ProductCard
  const ProductCard = ({ product, view }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    if (view === 'grid') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            <Link href={`/products/${product.slug}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-2 right-2 flex space-x-2"
                >
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <FiHeart className="text-gray-700" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <FiShare2 className="text-gray-700" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {product.reduction > 0 && (
              <div className="absolute top-2 left-2 bg-[#d93d0f] text-white text-xs px-2 py-1 rounded">
                -{product.reduction}%
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-1">
              <Link 
                href={`/products/${product.slug}`}
                className="font-medium text-gray-900 hover:text-[#ec8d0c] line-clamp-2"
              >
                {product.name}
              </Link>
              <div className="flex items-center text-sm text-gray-500">
                <FiStar className="text-yellow-400 mr-1" />
                {product.rating.toFixed(1)}
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mb-2">{product.boutique_name}</p>
            
            <div className="flex justify-between items-center">
              <div>
                {product.reduction > 0 ? (
                  <>
                    <span className="text-[#d93d0f] font-bold">
                      {product.prix_reduit.toLocaleString()} FCFA
                    </span>
                    <span className="ml-2 text-xs text-gray-500 line-through">
                      {product.price.toLocaleString()} FCFA
                    </span>
                  </>
                ) : (
                  <span className="text-[#071726] font-bold">
                    {product.price.toLocaleString()} FCFA
                  </span>
                )}
              </div>
              <button className="p-2 bg-[#071726] text-white rounded-full hover:bg-[#0d2a40]">
                <FiShoppingCart size={16} />
              </button>
            </div>
          </div>
        </motion.div>
        
      );
    }

    // Vue liste
    return (
        
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-1/3 relative">
          <Link href={`/products/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </Link>
          {product.reduction > 0 && (
            <div className="absolute top-2 left-2 bg-[#d93d0f] text-white text-xs px-2 py-1 rounded">
              -{product.reduction}%
            </div>
          )}
        </div>
        
        <div className="w-2/3 p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <Link 
              href={`/products/${product.slug}`}
              className="font-medium text-gray-900 hover:text-[#ec8d0c]"
            >
              {product.name}
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <FiStar className="text-yellow-400 mr-1" />
              {product.rating.toFixed(1)}
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mb-2">{product.boutique_name}</p>
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.description}</p>
          
          <div className="mt-auto flex justify-between items-center">
            <div>
              {product.reduction > 0 ? (
                <>
                  <span className="text-[#d93d0f] font-bold">
                    {product.prix_reduit.toLocaleString()} FCFA
                  </span>
                  <span className="ml-2 text-xs text-gray-500 line-through">
                    {product.price.toLocaleString()} FCFA
                  </span>
                </>
              ) : (
                <span className="text-[#071726] font-bold">
                  {product.price.toLocaleString()} FCFA
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <FiHeart className="text-gray-700" />
              </button>
              <button className="p-2 bg-[#071726] text-white rounded-full hover:bg-[#0d2a40]">
                <FiShoppingCart size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <AuthenticatedLayout><>
      <Head title="Boutiques & Produits" />
      
      {/* Hero Section */}
      <div className="bg-[#071726] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Découvrez nos produits</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Trouvez les meilleurs produits locaux du Cameroun
          </p>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Boutons de contrôle */}
            <div className="flex items-center space-x-3">
              {/* Bouton filtre mobile */}
              <button 
                onClick={() => setFiltersOpen(true)}
                className="md:hidden flex items-center px-3 py-2 bg-[#071726] text-white rounded-lg"
              >
                <FiFilter className="mr-2" />
                Filtres
              </button>

              {/* Sélecteur de tri */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                >
                  <option value="popular">Populaires</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="rating">Meilleures notes</option>
                  <option value="newest">Nouveautés</option>
                </select>
                <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>

              {/* Boutons de vue */}
              <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtres sidebar (desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filtres</h3>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-[#d93d0f] hover:text-[#ec8d0c] flex items-center"
                >
                  <FiRefreshCw className="mr-1" size={14} />
                  Réinitialiser
                </button>
              </div>

              {/* Filtre par catégorie */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Catégories</h4>
                <div className="space-y-2">
                  {fakeCategories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        id={`cat-${category.id}`}
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                        className="h-4 w-4 text-[#ec8d0c] focus:ring-[#ec8d0c]"
                      />
                      <label htmlFor={`cat-${category.id}`} className="ml-2 text-sm text-gray-700">
                        {category.name} ({category.product_count})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filtre par prix */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Fourchette de prix</h4>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{priceRange[0].toLocaleString()} FCFA</span>
                  <span>{priceRange[1].toLocaleString()} FCFA</span>
                </div>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full mb-2"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Liste des produits */}
          <div className="flex-1">
            {/* Résultats */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length > 1 ? 'produits trouvés' : 'produit trouvé'}
              </p>
            </div>

            {/* Affichage des produits */}
            {filteredProducts.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} view="grid" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} view="list" />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun produit ne correspond à vos critères</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-[#071726] text-white rounded-lg hover:bg-[#0d2a40]"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded border border-gray-300 text-gray-500">
                    Précédent
                  </button>
                  <button className="px-3 py-1 rounded bg-[#071726] text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 rounded border border-gray-300 text-gray-500">
                    Suivant
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filtres mobile */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30"
              onClick={() => setFiltersOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white z-40 overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Filtres</h3>
                  <button 
                    onClick={() => setFiltersOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">Catégories</h4>
                  <div className="space-y-2">
                    {fakeCategories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <input
                          id={`mob-cat-${category.id}`}
                          type="radio"
                          name="mob-category"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                          className="h-4 w-4 text-[#ec8d0c] focus:ring-[#ec8d0c]"
                        />
                        <label htmlFor={`mob-cat-${category.id}`} className="ml-2 text-sm text-gray-700">
                          {category.name} ({category.product_count})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">Fourchette de prix</h4>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{priceRange[0].toLocaleString()} FCFA</span>
                    <span>{priceRange[1].toLocaleString()} FCFA</span>
                  </div>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full mb-2"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={resetFilters}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                  >
                    Réinitialiser
                  </button>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="flex-1 px-4 py-2 bg-[#071726] text-white rounded-lg hover:bg-[#0d2a40]"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            </motion.div>
            
          </>
        )}
      </AnimatePresence>
    </>
    </AuthenticatedLayout>
  );
};

export default ProductsPage;