import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { FiShoppingBag, FiUser, FiStar, FiHeart, FiSearch, FiArrowRight } from 'react-icons/fi';
import { FaStore, FaShoppingCart, FaRegBell } from 'react-icons/fa';
import { Head, Link } from '@inertiajs/react'; // Utilisez le Link d'Inertia

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Données des produits
  const trendingProducts = [
    {
      id: 1,
      name: 'Robes en Wax Authentique',
      shop: 'Boutique Afrique Élégance',
      price: '15 000 FCFA',
      rating: 4.5,
      category: 'Mode',
      image: '/images/wax-dress.jpg',
      description: 'Collection exclusive de robes en wax 100% africain'
    },
    {
      id: 1,
      name: 'Robes en Wax Authentique',
      shop: 'Boutique Afrique Élégance',
      price: '15 000 FCFA',
      rating: 4.5,
      category: 'Mode',
      image: '/images/wax-dress.jpg',
      description: 'Collection exclusive de robes en wax 100% africain'
    },
    {
      id: 1,
      name: 'Robes en Wax Authentique',
      shop: 'Boutique Afrique Élégance',
      price: '15 000 FCFA',
      rating: 2.5,
      category: 'Mode',
      image: '/images/wax-dress.jpg',
      description: 'Collection exclusive de robes en wax 100% africain'
    },
    // ... autres produits
  ];

  const categories = [
    { name: 'Mode', icon: <FiShoppingBag size={24} /> },
    { name: 'Alimentation', icon: <FiShoppingBag size={24} /> },
    { name: 'Artisanat', icon: <FiShoppingBag size={24} /> },
    { name: 'Cosmétiques', icon: <FiShoppingBag size={24} /> },
    { name: 'Électronique', icon: <FiShoppingBag size={24} /> }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Header avec image de fond */}
        <header className={`relative transition-all duration-300 ${isScrolled ? 'h-20' : 'h-96'}`}>
          {/* Image de fond pour le header */}
          <div className="absolute inset-0 bg-[#071726] overflow-hidden">
            <img 
              src="cmr.png" 
              alt="Marché camerounais"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          
          {/* Overlay coloré */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071726] to-[#071726]/40"></div>
          
          {/* Contenu du header */}
          <div className={`relative z-10 container mx-auto px-4 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
            <div className="flex justify-between items-center">
              
              <div className="flex items-center space-x-2">
                <img src="loh.ico" alt="" className='w-auto h-12'/>
                <div className="text-white font-bold text-3xl">WANDA</div>
                <div className="text-[#ec8d0c] font-bold text-3xl">MARKET</div>
              </div>
              
              {/* Navigation principale */}
              <nav className={`hidden md:flex space-x-8 items-center transition-all ${isScrolled ? 'opacity-90' : 'opacity-100'}`}>
                <Link to="/" className="text-white hover:text-[#ec8d0c] font-medium flex items-center">
                  <FiShoppingBag className="mr-2" /> Boutiques
                </Link>
                <Link to="/categories" className="text-white hover:text-[#ec8d0c] font-medium flex items-center">
                  <FiStar className="mr-2" /> Catégories
                </Link>
                <Link to="/vendre" className="text-white hover:text-[#ec8d0c] font-medium flex items-center">
                  <FaStore className="mr-2" /> Vendre
                </Link>
              </nav>
              
              {/* Actions utilisateur */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-white hover:text-[#ec8d0c] transition">
                  <FiSearch size={20} />
                </button>
                <button className="p-2 text-white hover:text-[#ec8d0c] transition">
                  <FaShoppingCart size={20} />
                </button>
                <button className="p-2 text-white hover:text-[#ec8d0c] transition">
                  <FaRegBell size={20} />
                </button>
                <Link 
                  href="/connexion" 
                  className="hidden md:flex items-center space-x-1 px-4 py-2 bg-[#d93d0f] rounded-md hover:bg-[#ec8d0c] transition"
                >
                  <FiUser size={18} />
                  <span>Connexion</span>
                </Link>
              </div>
            </div>
            
            {/* se réduit quand on scroll */}
            {!isScrolled && (
              <div className="mt-16 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
                  Votre marché en ligne <span className="text-[#ec8d0c]">100% Camerounais</span>
                </h1>
                <p className="text-lg text-white/90 mb-8">
                  Découvrez les meilleurs produits locaux et soutenez l'économie camerounaise
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/products" 
                    className="px-8 py-3 bg-[#ec8d0c] text-white font-bold rounded-lg hover:bg-[#d93d0f] transition transform hover:scale-105 flex items-center justify-center"
                  >
                    Explorer les produits <FiArrowRight className="ml-2" />
                  </Link>
                  <Link 
                    href="/connexion" 
                    className="px-8 py-3 bg-white text-[#071726] font-bold rounded-lg hover:bg-gray-100 transition transform hover:scale-105 flex items-center justify-center"
                  >
                    Créer ma boutique <FaStore className="ml-2" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Contenu principal */}
        <main className="relative z-0">
          {/* Section Catégories */}
          <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#071726] mb-4">Nos Catégories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Parcourez nos différentes catégories pour trouver exactement ce que vous cherchez
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {categories.map((category, index) => (
                <Link
                  to={`/category/${category.name.toLowerCase()}`}
                  key={index}
                  className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#ec8d0c]/30 text-center"
                  onMouseEnter={() => setHoveredProduct(index)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${hoveredProduct === index ? 'bg-[#ec8d0c] text-white' : 'bg-[#071726]/5 text-[#071726]'}`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-[#071726] group-hover:text-[#d93d0f] transition">{category.name}</h3>
                </Link>
              ))}
            </div>
          </section>

          {/* Section Produits tendances */}
          <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#071726] mb-4">Produits Tendances</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Découvrez les produits les plus populaires du moment
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trendingProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden h-60">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-[#ec8d0c] hover:text-white transition">
                        <FiHeart size={20} />
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-[#071726]">{product.name}</h3>
                        <span className="bg-[#071726]/10 text-[#071726] text-xs px-3 py-1 rounded-full">{product.category}</span>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-3">{product.shop}</p>
                      <p className="text-gray-700 mb-4">{product.description}</p>
                      
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[#ec8d0c]' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#d93d0f]">{product.price}</span>
                        <Link 
                          to={`/product/${product.id}`}
                          className="px-5 py-2 bg-[#071726] text-white text-sm rounded-md hover:bg-[#ec8d0c] transition flex items-center"
                        >
                          Acheter <FiArrowRight className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  to="/products"
                  className="inline-flex items-center px-6 py-3 border border-[#071726] text-[#071726] font-medium rounded-md hover:bg-[#071726] hover:text-white transition"
                >
                  Voir tous les produits <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </section>

          {/* CTA pour vendre */}
          <section className="py-16 bg-[#071726] text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Vous êtes artisan ou commerçant ?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Rejoignez WANDA MARKET et augmentez votre visibilité en vendant vos produits à travers tout le Cameroun
              </p>
              <Link 
                to="/create-shop"
                className="inline-flex items-center px-8 py-4 bg-[#ec8d0c] text-white font-bold rounded-lg hover:bg-[#d93d0f] transition transform hover:scale-105"
              >
                Créer ma boutique gratuitement <FaStore className="ml-3" />
              </Link>
            </div>
          </section>
        </main>

        {/* Pied de page */}
        <footer className="bg-gray-900 text-gray-300 py-12">
         
        </footer>
      </div>
    </Router>
  );
};

export default HomePage;