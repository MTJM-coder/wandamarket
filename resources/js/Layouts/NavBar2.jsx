import React, { useState } from "react";
import {
  FiUser,
  FiShoppingCart,
  FiChevronDown,
  FiPackage,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiBox

} from "react-icons/fi";
import { usePage } from "@inertiajs/react";

const NavBar2 = ({ number = 0 }) => {
  const { props } = usePage()
  const auth = props.auth
  const isConnected = auth.isConnected

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
console.log(cart)
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);


  return (
    <div className="bg-orange-500 md:bg-white shadow-md fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 md:px-8">
      {/* Logo */}
      <h2 className="md:text-3xl font-bold md:text-orange-500 text-white">
        WandaMarket.com
      </h2>

      {/* Icônes à droite */}
      <div className="ml-auto flex items-center space-x-6">
        {/* -------- Panier -------- */}
        <div
          onMouseEnter={() => setShowCart(true)}
          onMouseLeave={() => setShowCart(false)}
          className="relative"
        >
          <button
            onClick={() => setShowCart(!showCart)}
            className="p-2 rounded-lg bg-orange-100 transition-colors relative"
          >
            <FiShoppingCart className="text-xl text-orange-500 hover:text-orange-500" />
            {number > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center font-semibold">
                {number > 9 ? "9+" : number}
              </span>
            )}
          </button>

          {/* Menu Panier */}
          {showCart && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
              <div className="p-4 border-b border-gray-100 flex justify-between">
                <h3 className="font-semibold text-gray-900">Mon Panier</h3>
                <span className="text-sm text-gray-500">
                  {number} article{number > 1 ? "s" : ""}
                </span>
              </div>

              <div className="p-4">
                {number === 0 ? (
                  <div className="text-center py-8">
                    <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4">Votre panier est vide</p>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      Découvrir nos produits
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Exemple d'articles */}
                    {cart.map(prod =>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg">
                          <img src={prod.imageUrl} alt="" className="rounded-lg w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{prod.name}</p>
                          <p className="text-xs text-gray-500">{prod.price} FCFA</p>
                        </div>
                        <span className="text-sm font-semibold">×{prod.quantity}</span>
                      </div>
                    )
                    }

                    {/* Total */}
                    <div className="border-t pt-3 mt-3">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-orange-600">
                         {cart.reduce((sum, c) => sum + c.price * c.quantity, 0)} FCFA

                        </span>
                      </div>
                      <button
                        onClick={() => (window.location.href = "/panier")}
                        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Voir le panier
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* -------- Compte -------- */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              {isConnected ? (
                <span className="text-white font-semibold text-sm">{auth.user.prenom?.slice(0, 1)}{auth.user.nom?.slice(0, 1)}</span>
              ) : (
                <FiUser className="text-white" />
              )}
            </div>
            <FiChevronDown
              className={`text-gray-400 transition-transform duration-200 hidden sm:block ${showUserMenu ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Dropdown Utilisateur */}
          {showUserMenu && (
            <div className=" hidden md:inline-block absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
              {isConnected ? (
                <>
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 p-4 space-y-3 text-sm text-black">
                    <div className="font-semibold">{auth.user?.prenom} {auth.user?.nom}</div>
                    <hr />
                    <div className="hover:bg-gray-100 p-2 rounded cursor-pointer items-center flex gap-2" onClick={() => window.location.href = '/buyer/dashboard'}><FiUser />Profil</div>
                    <div className="hover:bg-gray-100 p-2 rounded cursor-pointer items-center flex gap-2" onClick={() => window.location.href = '/buyer/order'}><FiBox /> Mes Commandes</div>
                    <div className="hover:bg-gray-100 p-2 rounded cursor-pointer items-center flex gap-2" onClick={() => window.location.href = '/buyer/dashboard'}><FiSettings /> Paramètres</div>
                    <div className="hover:bg-gray-100 p-2 rounded cursor-pointer items-center flex gap-2" onClick={() => window.location.href = '/logout'}><FiLogOut /> Déconnexion</div>
                  </div>
                </>
              ) : (
                <div className="p-4">
                  <h3 className="font-semibold mb-4">Connexion requise</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                      Se connecter
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      S'inscrire
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ Petit composant pour factoriser les items du menu
const MenuItem = ({ icon, label, danger = false }) => (
  <button
    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${danger
        ? "text-red-600 hover:bg-red-50"
        : "hover:bg-gray-50 text-gray-700"
      }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default NavBar2;
