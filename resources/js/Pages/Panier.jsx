import React, { useEffect, useState } from 'react';
import NavBar2 from '@/Layouts/NavBar2';
import { FiShoppingCart, FiTrash } from 'react-icons/fi';

const Panier = () => {
  // Récupérer le panier depuis localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fonction pour augmenter la quantité
  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity = (newCart[index].quantity || 1) + 1;
    setCart(newCart);
  };

  // Fonction pour diminuer la quantité
  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if ((newCart[index].quantity || 1) > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    }
  };

  // Fonction pour supprimer un produit
  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  // Calcul du total
  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const fraisLivraison = 500;
  const totalAPayer = total + fraisLivraison;

  return (
    <>
      <div className="hidden lg:block">
        <NavBar2 />
      </div>
      <div className="flex flex-col lg:flex-row mt-24 px-4 lg:px-10 gap-6">
        
        {/* Colonne gauche : produits */}
        <div className="w-full lg:w-[70%] max-w-4xl md:mb-0 mb-40 mr-4">
          <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 md:flex md:justify-between md:shadow-sm">
            <h1 className="text-2xl md:text-3xl font-bold m-2 md:mb-6">
              <FiShoppingCart className="inline mr-4" /> Mon panier
            </h1>
          </div>

          {cart.length === 0 ? (
            <p className="mt-20 text-center text-gray-500">Votre panier est vide</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-1 md:p-4 mb-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">
                  Boutique du vêtement de Mboppi
                </h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-100 p-4 rounded-lg">
                  
                  {/* Image + infos produit */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        Couleur : Rouge / Taille : M
                      </p>
                      <p className="text-orange-500 font-semibold">
                        Prix unitaire : {item.price} Fcfa
                      </p>
                    </div>
                  </div>

                  {/* Quantité + supprimer */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="min-w-[30px] text-center">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => increaseQuantity(index)}
                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="p-2 bg-red-100 rounded-full hover:bg-red-200"
                    >
                      <FiTrash className="text-red-500 hover:text-red-700 text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Colonne droite : résumé */}
        {cart.length > 0 && (
          <div className="fixed md:left-2/3 md:bottom-36 bottom-0 left-0 right-0 md:z-auto z-50 w-full lg:w-[30%] max-w-4xl mx-auto lg:mx-0 bg-white rounded-lg p-1 md:p-4 shadow-sm">
            <h2 className="hidden lg:flex text-xl font-semibold mb-4">Résumé de la commande</h2>
            <div className="hidden lg:flex justify-between mb-2">
              <span className="font-medium">Total des articles :</span>
              <span className="text-orange-500 font-semibold">{total} F</span>
            </div>
            <div className="hidden md:flex justify-between mb-2">
              <span className="font-medium">Frais de livraison :</span>
              <span className="text-orange-500 font-semibold">{fraisLivraison} F</span>
            </div>
            <span className="block italic text-sm my-1 md:mb-2 ">
              (Commandez et payez à la livraison)
            </span>
            <hr className="my-2 md:my-4" />
            <div className="flex justify-between font-bold">
              <span>Total à payer :</span>
              <span className="text-orange-600">{totalAPayer} F</span>
            </div>
            <button className="mt-1 md:mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
              Commander maintenant
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Panier;
