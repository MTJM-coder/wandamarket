import React, { useState, useEffect } from 'react';
import NavBar2 from '@/Layouts/NavBar2';
import Footer from '@/Layouts/footer';
import AddCart from '@/Pages/AddCart';
import { router, usePage } from '@inertiajs/react';

import {
  FiChevronLeft,
  FiChevronRight,
  FiMessageSquare,
  FiShoppingCart,
  FiPackage,
  FiX,
  FiCheck
} from 'react-icons/fi';

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const DetailProduct = () => {
  const { props } = usePage();
  const auth = props.auth;
  const user = auth.user;
  const produit = props.produit;
  const similarProduct = props.similaires ?? [];

  const { cart, addToCart } = AddCart();
 const existingBoutiqueId = cart.length > 0 ? cart[0].boutique_id : null;

  // États
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alertAddCart, setAlertAddCart] = useState(false);
  const [showRubanOrder, setShowRubanOrder] = useState(false);
  const [addQuantity, setAddQuantity] = useState(1);
  const [filter, setFilter] = useState('all');
  const [showOrderDirect, setShowOrderDirect] = useState(false);


  const handleDiscuss = (produit_id,receiver_id) => {

    if (!user) {
      window.location.href = ('/connexion');
      return;
    }

    router.post('/conversation/start',{produit_id,receiver_id})
  }

  const prix = parseInt(produit.prix);

  // Gestion de l'alerte panier
  useEffect(() => {
    if (alertAddCart) {
      const timer = setTimeout(() => {
        setAlertAddCart(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alertAddCart]);

  // Navigation images
  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : produit.images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < produit.images.length - 1 ? prev + 1 : 0));
  };

  // Ajouter au panier
  const handleAddToCart = () => {
    const productToAdd = {
      id: produit.id,
      name: produit.nom,
      imageUrl: `/storage/${produit.images[currentIndex]?.url}`,
      price: produit.prix,
      quantity: addQuantity,
      boutique: produit.boutique.nom,
      boutique_id: produit.boutique.id
    };

    addToCart(productToAdd);
    setAlertAddCart(true);
    setShowRubanOrder(false);
  };

  // Rendu des étoiles pour la moyenne
  const renderStars = () => {
    const avis = produit?.avis ?? [];
    const totalAvis = avis.length;

    if (totalAvis === 0) {
      return Array.from({ length: 5 }, (_, i) => (
        <FaRegStar key={i} className="text-gray-300" />
      ));
    }

    const moyenne =
      avis.reduce((sum, item) => sum + Number(item.note || 0), 0) / totalAvis;

    return Array.from({ length: 5 }, (_, i) => {
      const index = i + 1;
      if (moyenne >= index) {
        return <FaStar key={i} className="text-yellow-500" />;
      } else if (moyenne >= index - 0.5) {
        return <FaStarHalfAlt key={i} className="text-yellow-500" />;
      } else {
        return <FaRegStar key={i} className="text-gray-300" />;
      }
    });
  };

  // Filtres des avis
  const filteredAvis = produit.avis.filter((comment) => {
    if (filter === 'all') return true;
    if (filter === 'photo') return comment.images && comment.images.length > 0;
    if (filter.startsWith('note:')) {
      const noteValue = parseInt(filter.split(':')[1]);
      return comment.note === noteValue;
    }
    return true;
  });
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientVille, setClientVille] = useState('');
  const [clientQuartier, setClientQuartier] = useState('');


  const handleCommand = (e) => {

    // e.preventDefault();
    if (!user) {
      window.location.href = ('/connexion');
      return;
    }

    const orderData = {
      produit_id: produit.id,
      quantity: addQuantity,
      clientName: clientName,
      clientPhone: clientPhone,
      clientQuartier: clientQuartier,
      clientVille: clientVille
    }

    router.post('/pass/order', orderData);

  };
  const [useAccountInfo, setUseAccountInfo] = useState(false);
  useEffect(() => {
    if (useAccountInfo && auth.user) {
      setClientName(auth.user.nom || '');
      setClientPhone(auth.user.telephone || '');
      setClientVille(auth.user.ville || '');
      setClientQuartier(auth.user.quartier || '');
    }
  }, [useAccountInfo, auth.user]);




  return (
    <>
      {/* Navbar */}
      <NavBar2 number={cart.length} />

      {/* Alerte ajout panier */}
      {alertAddCart && (
        <div
          className="fixed bottom-10 right-4 bg-green-500 text-white p-4 rounded-lg flex items-center shadow-lg z-50 animate-fadeIn"
          style={{ animation: 'fadeIn 0.5s, fadeOut 0.5s 2.5s forwards' }}
        >
          <div className="inline-flex items-center justify-center w-7 h-7 bg-white rounded-full text-green-500 mr-3">
            <FiCheck size={18} />
          </div>
          <span>Produit ajouté au panier</span>
        </div>
      )}

      <div className="mt-16 md:p-6 py-6 px-2 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Détails du produit</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Miniatures */}
          <div className="flex md:flex-col gap-4">
            {produit.images.map((img, index) => (
              <div
                key={index}
                className={`p-1 border rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${currentIndex === index ? 'border-orange-500' : 'border-gray-300'
                  }`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={`/storage/${img.url}`}
                  alt={`Miniature ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Image principale */}
          <div className="flex items-center md:gap-4 bg-gray-100 p-4 rounded-lg">
            <FiChevronLeft
              className="text-3xl cursor-pointer hover:text-orange-500 transition-colors"
              onClick={handlePrev}
            />
            <img
              src={`/storage/${produit.images[currentIndex]?.url}`}
              alt="Produit"
              className="md:w-[400px] w-[300px] md:h-[400px] h-[300px] object-cover rounded-lg"
            />
            <FiChevronRight
              className="text-3xl cursor-pointer hover:text-orange-500 transition-colors"
              onClick={handleNext}
            />
          </div>

          {/* Infos produit */}
          <div className="flex-1 md:text-base text-xs">
            <h2 className="text-xl font-semibold mb-2">
              {produit?.nom}{' '}
              <span className="text-gray-500">
                — <i>{produit?.boutique?.nom}</i>
              </span>
            </h2>

            <p className="text-gray-700 mb-4">{produit?.description}</p>
            <p className="font-bold mb-2">
              Ville :{' '}
              <span className="text-gray-800">
                {produit?.boutique?.user?.ville}
              </span>
            </p>
            <p className="font-bold text-orange-600 mb-4">
              Prix : {prix.toLocaleString()} FCFA
            </p>

            {/* Notes */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-medium">Notes :</span>
              <div className="flex">{renderStars()}</div>
              <span className="text-gray-600 text-sm">
                {produit?.avis?.length > 0
                  ? `(${(
                    produit.avis.reduce(
                      (sum, item) => sum + Number(item.note || 0),
                      0
                    ) / produit.avis.length
                  ).toFixed(1)})`
                  : '(0.0)'}
              </span>
              <span className="text-gray-500 text-sm">
                {produit?.avis?.length > 0
                  ? `${produit.avis.length} avis`
                  : 'Pas encore noté'}
              </span>
            </div>

            {/* Boutons */}
            <div className="flex flex-wrap gap-3 mt-6">
              {(!existingBoutiqueId || existingBoutiqueId === produit.boutique.id)&&(
                < button
                className="flex items-center gap-2 border-2 border-black px-6 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition"
              onClick={() => setShowRubanOrder(true)}
              >
              <FiShoppingCart /> Ajouter au panier
            </button>)
}
            <button onClick={() => setShowOrderDirect(true)} className="flex items-center gap-2 border-2 border-black px-6 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition">
              <FiPackage /> Commander
            </button>
            <button onClick={() => handleDiscuss(produit.id,produit?.boutique?.user?.id)} className="flex items-center gap-2 border-2 border-black px-6 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition">
              <FiMessageSquare /> Discuter

            </button>
          </div>
        </div>
      </div>

      {/* Produits similaires et avis */}
      <h2 className="mt-20 md:text-3xl font-extrabold">
        Produits similaires, avis et recommandations
      </h2>
      <div className="flex md:flex-row flex-col-reverse mt-10 md:gap-6">
        {/* Produits similaires */}
        <div className="md:w-1/2 grid grid-cols-2 gap-2">
          {similarProduct.map(item => (
            <div
              key={item.id}
              onClick={() => router.get(`/detail-product/${item.id}`)}
              className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition"
            >
              <div
                className="bg-cover bg-center rounded-lg h-32"
                style={{ backgroundImage: `url(/storage/${item.images[0]?.url})` }}
              ></div>
              <p className="mt-4 font-bold text-gray-500 text-sm">{item.nom}</p>
              <p className="hidden md:inline-block text-xs text-gray-600 h-16 overflow-hidden">
                {item.description}
              </p>
              <p className="font-bold">
                {parseInt(item.prix).toLocaleString()} FCFA
              </p>
            </div>
          ))}
        </div>

        {/* Avis */}
        <div className="md:w-1/2 bg-gray-100 rounded-lg md:p-6 p-3">
          <h1 className="font-extrabold text-2xl mb-4">Notes et Commentaires</h1>

          {/* Filtres des avis */}
          <div className="flex justify-between items-center mb-4">
            <button
              className={`px-3 py-1 border-2 rounded-[15px] transition ${filter === 'all' ? 'bg-orange-500 text-white' : 'border-black'}`}
              onClick={() => setFilter('all')}
            >
              Tous
            </button>
            <button
              className={`px-3 py-1 border-2 rounded-[15px] transition ${filter === 'photo' ? 'bg-orange-500 text-white' : 'border-black'}`}
              onClick={() => setFilter('photo')}
            >
              Avec Photos
            </button>
            <select
              className="border rounded-[15px] px-2 py-1"
              onChange={(e) => setFilter(`note:${e.target.value}`)}
            >
              <option value="">Notes</option>
              <option value="5">5 étoiles</option>
              <option value="4">4 étoiles</option>
              <option value="3">3 étoiles</option>
              <option value="2">2 étoiles</option>
              <option value="1">1 étoile</option>
            </select>
          </div>

          {/* Liste des avis filtrés */}
          <div className="space-y-4">
            {filteredAvis.length > 0 ? (
              filteredAvis.map((comment) => (
                <div key={comment.id} className="flex flex-col gap-2 border-b pb-4">
                  {/* Nom de l'utilisateur */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">
                      {comment.user?.nom} {comment.user?.prenom ?? ''}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>

                  {/* Note en étoiles */}
                  <p className="text-yellow-500">
                    {"★".repeat(comment.note)}{"☆".repeat(5 - comment.note)}
                  </p>

                  {/* Commentaire */}
                  <p className="text-gray-700">{comment.commentaire}</p>

                  {/* Images */}
                  {comment.images && comment.images.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {comment.images.map((image, index) => (
                        <img
                          key={index}
                          src={`/storage/${image.url}`}
                          alt="Avis utilisateur"
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Aucun avis pour ce filtre.</p>
            )}
          </div>
        </div>
      </div>

      {/* Ruban commande */}
      {showRubanOrder && (
        <div className="mt-20 bg-white shadow-md p-6 rounded-lg md:w-1/2 w-full fixed right-0 top-0 z-50">
          <FiX
            className="text-2xl cursor-pointer bg-gray-300 absolute top-2 right-2 rounded-full p-1"
            onClick={() => setShowRubanOrder(false)}
          />
          <h1 className="text-2xl font-bold mb-6">
            Choisissez la quantité et les variations
          </h1>
          <h2 className="text-xl font-bold mb-4">{prix} FCFA</h2>
          <hr />

          <div className="flex justify-between items-center mt-4">
            <div>
              <img
                src={`/storage/${produit.images[0]?.url}`}
                alt={produit.nom}
                className="w-20 h-20 rounded mb-2 border-2 border-black"
              />
              <p>{produit.nom}</p>
            </div>

            {/* Quantité */}
            <div>
              <p className="mb-2">Quantité</p>
              <div className="flex items-center gap-2">
                <button
                  className="border px-3 py-1 rounded-lg hover:bg-orange-500 hover:text-white"
                  onClick={() =>
                    setAddQuantity(addQuantity > 1 ? addQuantity - 1 : 1)
                  }
                >
                  -
                </button>
                <span className="text-xl font-bold">{addQuantity}</span>
                <button
                  className="border px-3 py-1 rounded-lg hover:bg-orange-500 hover:text-white"
                  onClick={() => setAddQuantity(addQuantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mt-6">
            <p className="font-semibold">Total</p>
            <p className="font-bold">{(addQuantity * prix).toLocaleString()} FCFA</p>
          </div>

          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-orange-600 w-full"
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="inline mr-2" /> Ajouter au panier
          </button>
        </div>
      )}

      {showOrderDirect && (
        <div className="fixed right-0 top-0 z-50 w-full md:w-1/2 max-h-screen bg-white shadow-xl p-6 rounded-lg overflow-auto">
          <FiX
            className="absolute text-2xl cursor-pointer bg-gray-300 top-2 right-2 rounded-full p-1 hover:bg-gray-400"
            onClick={() => setShowOrderDirect(false)}
          />

          <h1 className="text-2xl font-bold mb-6">Finaliser votre commande</h1>

          {/* PRODUIT + QUANTITÉ */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col items-center">
              <img
                src={`/storage/${produit.images[0]?.url}`}
                alt={produit.nom}
                className="w-20 h-20 rounded border-2 border-black object-cover"
              />
              <p className="font-semibold mt-2">{produit.nom}</p>
            </div>

            <div>
              <p className="mb-2 font-medium">Quantité</p>
              <div className="flex items-center gap-2">
                <button
                  className="border px-3 py-1 rounded-lg hover:bg-orange-500 hover:text-white"
                  onClick={() => setAddQuantity(addQuantity > 1 ? addQuantity - 1 : 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={addQuantity}
                  onChange={(e) => setAddQuantity(Number(e.target.value))}
                  className="w-16 text-center border rounded-lg"
                />
                <button
                  className="border px-3 py-1 rounded-lg hover:bg-orange-500 hover:text-white"
                  onClick={() => setAddQuantity(addQuantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* INFOS LIVRAISON */}
          <h2 className="text-lg font-bold mb-4">Informations de livraison</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={useAccountInfo}
                onChange={() => setUseAccountInfo(!useAccountInfo)}
              />
              <label>Utiliser mes informations enregistrées</label>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nom complet"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full text-sm p-2 border rounded-lg"
                required
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full text-sm p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ville"
                value={clientVille}
                onChange={(e) => setClientVille(e.target.value)}
                className="w-full text-sm p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Quartier (point de repère)"
                value={clientQuartier}
                onChange={(e) => setClientQuartier(e.target.value)}
                className="w-full text-sm p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* TOTAL */}
          <div className="flex justify-between items-center mt-6 text-lg">
            <p className="font-semibold">Total</p>
            <p className="font-bold text-orange-600">{(addQuantity * prix).toLocaleString()} FCFA</p>
          </div>

          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-orange-600 w-full transition"
            onClick={() => handleCommand()}
          >
            <FiShoppingCart className="inline mr-2" /> Commander
          </button>
        </div>

      )}



    </div >

      <Footer />
    </>
  );
};

export default DetailProduct;
