import { router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import {
  FaBoxOpen,
  FaTruck,
  FaPlaneDeparture,
  FaStore,
  FaCheckCircle,
  FaComment,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCopy
} from "react-icons/fa";
import {
  FiBox,
  FiClock,
  FiMessageSquare,
  FiCheck,
  FiPackage,
  FiTruck,
  FiHome,
  FiStar,
  FiCalendar,
  FiUser,
  FiPhone,
  FiMail,
  FiArrowLeft,
  FiAlertCircle
} from "react-icons/fi";

const SuiviColis = () => {
  const { props } = usePage();
  const orderData = props.order;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  // Configuration des étapes avec mapping dynamique
  const getOrderSteps = () => {
    const baseSteps = [
      {
        id: 1,
        titre: "Commande Passée",
        icone: <FiPackage className="w-4 h-4" />,
        description: "Votre commande a été reçue",
        date: orderData?.created_at
      },
      {
        id: 2,
        titre: "Préparation",
        icone: <FaStore className="w-4 h-4" />,
        description: "Le vendeur prépare votre commande",
        date: orderData?.date_commande
      },
      // {
      //   id: 3,
      //   titre: "Expédiée",
      //   icone: <FaPlaneDeparture className="w-4 h-4" />,
      //   description: "Votre colis a été expédié",
      //   date: orderData?.date_expedition
      // },
      {
        id: 4,
        titre: "En Transit",
        icone: <FiTruck className="w-4 h-4" />,
        description: "Votre colis est en cours de livraison",
        date: orderData?.date_transit
      },
      {
        id: 5,
        titre: "Livrée",
        icone: <FiHome className="w-4 h-4" />,
        description: "Livraison à votre adresse",
        date: orderData?.date_livraison
      },
      {
        id: 6,
        titre: "Terminée",
        icone: <FiCheck className="w-4 h-4" />,
        description: "Réception confirmée par le client",
        date: orderData?.date_confirmation
      }
    ];

    return baseSteps;
  };

  // Déterminer le statut de chaque étape selon l'état de la commande
  const getStepStatus = (etapeTitre) => {
    if (!orderData?.etat) return "pending";

    const etat = orderData.etat.toLowerCase();
    
    switch (etat) {
      case "en attente":
        return etapeTitre === "Commande Passée" ? "completed" : "pending";
      
      case "en cours":
        return ["Commande Passée", "Préparation"].includes(etapeTitre) ? "completed" : "pending";
      
      case "expédiée":
        if (etapeTitre === "Expédiée") return "current";
        return ["Commande Passée", "Préparation"].includes(etapeTitre) ? "completed" : "pending";
      
      case "en transit":
        if (etapeTitre === "En Transit") return "current";
        return ["Commande Passée", "Préparation", "Expédiée"].includes(etapeTitre) ? "completed" : "pending";
      
      case "livrée":
        if (etapeTitre === "Livrée") return "current";
        return ["Commande Passée", "Préparation", "Expédiée", "En Transit"].includes(etapeTitre) ? "completed" : "pending";
      
      case "terminée":
        return "completed";
      
      default:
        return "pending";
    }
  };

  const copyOrderId = () => {
    if (orderData?.id) {
      navigator.clipboard.writeText(orderData.id.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const confirmReception = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmReception = async () => {
    setIsConfirming(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowConfirmModal(false);
      router.get(`/confirm/${orderData.id}/orer`)
      // alert("Réception confirmée ! Merci pour votre achat.");
      // Redirection vers la page d'avis
      // window.location.href = "/buyer/order/avis";
    } catch (error) {
      console.error("Erreur lors de la confirmation:", error);
    } finally {
      setIsConfirming(false);
    }
  };
  
  const getStatusBadge = (status) => {
    if (!status) return null;

    const badges = {
      "en attente": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "en cours": "bg-blue-100 text-blue-800 border-blue-200",
      "expédiée": "bg-purple-100 text-purple-800 border-purple-200",
      "en transit": "bg-orange-100 text-orange-800 border-orange-200",
      "livrée": "bg-green-100 text-green-800 border-green-200",
      "terminée": "bg-green-100 text-green-800 border-green-200"
    };

    const labels = {
      "en attente": "En attente",
      "en cours": "En cours",
      "expédiée": "Expédiée",
      "en transit": "En transit",
      "livrée": "Livrée",
      "terminée": "Terminée"
    };

    const statusKey = status.toLowerCase();
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${badges[statusKey] || badges["en attente"]}`}>
        {labels[statusKey] || "Statut inconnu"}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date non définie";
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return "Date invalide";
    }
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return "0";
    return Number(price).toLocaleString('fr-FR');
  };

  // Vérifier si les données sont disponibles
  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Commande introuvable</h2>
          <p className="text-gray-600">Les informations de cette commande ne sont pas disponibles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <FiArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-full">
                <FiBox size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Suivi de Commande</h1>
                <p className="text-orange-100">Suivez votre colis en temps réel</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Statut principal */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-full">
                  <FiClock size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Commande {orderData.etat || "En cours"}
                  </h2>
                  <p className="text-gray-600">
                    Livraison estimée: {orderData.date_livraison ? formatDate(orderData.date_livraison) : "À définir"}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              {getStatusBadge(orderData.etat)}
            </div>
          </div>
        </div>

        {/* Timeline de suivi */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FiTruck className="text-orange-500" />
            Progression de votre commande
          </h3>

          <div className="space-y-6">
            {getOrderSteps().map((etape, index) => {
              const status = getStepStatus(etape.titre);
              const isLast = index === getOrderSteps().length - 1;

              const statusStyles = {
                completed: {
                  icon: "bg-green-500 text-white",
                  line: "bg-green-500"
                },
                current: {
                  icon: "bg-orange-500 text-white animate-pulse",
                  line: "bg-orange-500"
                },
                pending: {
                  icon: "bg-gray-300 text-gray-500",
                  line: "bg-gray-300"
                }
              };

              return (
                <div key={etape.id} className="relative flex items-start">
                  {/* Ligne de connexion */}
                  {!isLast && (
                    <div 
                      className={`absolute left-4 top-8 w-0.5 h-16 ${statusStyles[status].line}`}
                    />
                  )}

                  {/* Icône */}
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full z-10 ${statusStyles[status].icon}`}>
                    {etape.icone}
                  </div>

                  {/* Contenu */}
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{etape.titre}</h4>
                      {status === 'completed' && (
                        <FiCheck className="text-green-500 w-4 h-4" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{etape.description}</p>
                    {etape.date && (
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <FiCalendar size={12} />
                        {formatDate(etape.date)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Informations de commande */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Détails client */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiUser className="text-orange-500" />
              Informations de livraison
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Destinataire</p>
                <p className="font-medium">{orderData.client_nom || "Non spécifié"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{orderData.client_telephone || "Non spécifié"}</p>
                  {orderData.client_telephone && (
                    <a 
                      href={`tel:${orderData.client_telephone}`}
                      className="text-orange-500 hover:text-orange-600"
                    >
                      <FiPhone size={16} />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="font-medium flex items-start gap-2">
                  <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0" size={14} />
                  {orderData.client_quartier && orderData.client_ville 
                    ? `${orderData.client_quartier}, ${orderData.client_ville}`
                    : "Adresse non spécifiée"
                  }
                </p>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">N° de commande</p>
                    <p className="font-medium">{orderData.id || "N/A"}</p>
                  </div>
                  <button
                    onClick={copyOrderId}
                    className="text-orange-500 hover:text-orange-600 p-1"
                    title="Copier le numéro"
                    disabled={!orderData.id}
                  >
                    {copied ? <FiCheck size={16} /> : <FaCopy size={16} />}
                  </button>
                </div>

                <div className="mt-3">
                  <p className="text-sm text-gray-500">Date de commande</p>
                  <p className="font-medium">{formatDate(orderData.created_at)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Détails vendeur */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaStore className="text-orange-500" />
                Vendeur
              </h3>
              <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium">
                <FiMessageSquare size={16} />
                Contacter
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nom de la boutique</p>
                <p className="font-medium">{orderData.boutique?.nom || "Boutique non spécifiée"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Contact vendeur</p>
                <p className="font-medium">{orderData.boutique?.telephone || "Contact non disponible"}</p>
              </div>
            </div>

            {/* Articles commandés */}
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-3">Articles commandés</h4>
              <div className="space-y-3">
                {orderData.commande_produits && orderData.commande_produits.length > 0 ? (
                  orderData.commande_produits.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.produit?.images?.[0]?.url 
                          ? `/storage/${item.produit.images[0].url}` 
                          : '/placeholder-image.jpg'
                        }
                        alt={item.produit?.nom || 'Produit'}
                        className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {item.produit?.nom || 'Nom du produit non disponible'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.produit?.variation || ''}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-semibold text-orange-600">
                            {formatPrice(item.produit?.prix)} FCFA
                          </span>
                          <span className="text-sm text-gray-500">x{item.quantite || 1}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Aucun article trouvé</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Récapitulatif financier */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Récapitulatif de la commande</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Sous-total produits</span>
              <span className="font-medium">{formatPrice(orderData.montant_total)} FCFA</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Frais de livraison</span>
              <span className="font-medium">
                {orderData.frais_livraison ? `${formatPrice(orderData.frais_livraison)} FCFA` : 'Gratuit'}
              </span>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-orange-600">
                  {formatPrice((orderData.montant_total || 0) + (orderData.frais_livraison || 0))} FCFA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions et actions */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Instructions importantes</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Confirmez la réception après avoir reçu votre commande</li>
            <li>• Vérifiez l'état des articles avant de confirmer</li>
            <li>• Contactez le vendeur en cas de problème</li>
            <li>• Laissez un avis pour aider d'autres clients</li>
          </ul>
        </div>

        {/* Bouton de confirmation */}
        {/* {orderData.etat === 'en attente' && ( */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Avez-vous reçu votre commande ?</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Confirmez la réception pour finaliser votre achat et débloquer les fonds au vendeur
              </p>
              <button
                onClick={confirmReception}
                disabled={isConfirming}

                className="w-full lg:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium rounded-lg transition-colors"
              >
                {isConfirming ? 'Confirmation en cours...' : 'Confirmer la réception'}
              </button>
            </div>
          </div>
        {/* )} */}
      </div>

      {/* Modal de confirmation */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Confirmer la réception</h3>
              <p className="text-gray-600 mb-6">
                Confirmez-vous avoir reçu votre commande en bon état ?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  disabled={isConfirming}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmReception}
                  disabled={isConfirming}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-orange-300"
                >
                  {isConfirming ? 'Confirmation...' : 'Confirmer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuiviColis;