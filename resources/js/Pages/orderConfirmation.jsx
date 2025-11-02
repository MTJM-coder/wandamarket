import React, { useState, useEffect } from 'react'
import { 
  FiCheckCircle, 
  FiPackage, 
  FiTruck, 
  FiMapPin, 
  FiPhone, 
  FiUser, 
  FiCalendar,
  FiClock,
  FiMail,
  FiDownload,
  FiEye,
  FiArrowLeft,
  FiShare2
} from 'react-icons/fi'
import { usePage, router, Link } from '@inertiajs/react'

const OrderConfirmation = () => {
  const { props } = usePage()
  const order = props.order || {}
  const auth = props.auth
  
  const [showDetails, setShowDetails] = useState(false)
  const [copied, setCopied] = useState(false)

  // Simuler les données si pas présentes dans props
  const orderData = {
    id: order.id || '12345',
    numero: `CMD-${String(order.id || '12345').padStart(4, '0')}`,
    produits: order.commande_produits || [
      {
        id: 1,
        produit: {
          nom: 'Support Laptop',
          prix: 7000,
          images: [{ url: 'laptop-support.jpg' }]
        },
        quantite: 1
      }
    ],
    montant_total: order.montant_total || 7000,
    frais_livraison: order.frais_livraison || 0,
    montant_final: (order.montant_total || 7000) + (order.frais_livraison || 0),
    informations_livraison: order.informations_livraison || {
      nom: 'Merlando',
      telephone: '673917550',
      ville: 'Douala',
      quartier: 'Akwa',
      adresse_complete: 'Rue de la Liberté, Douala'
    },
    boutique: order.boutique || {
      nom: 'Tech Store',
      telephone: '+237 6XX XXX XXX'
    },
    etat: order.etat || 'confirmée',
    created_at: order.created_at || new Date().toISOString(),
    delai_livraison: order.delai_livraison || '2-3 jours ouvrables'
  }

  // Fonction pour copier le numéro de commande
  const copyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(orderData.numero)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
    }
  }

  // Fonction pour télécharger la facture (simulée)
  const downloadInvoice = () => {
    // Ici vous pouvez implémenter la génération de PDF ou rediriger vers l'endpoint de facture
    router.get(`/orders/${orderData.id}/invoice`)
  }

  // Fonction pour partager la commande
  const shareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Commande ${orderData.numero}`,
          text: `Ma commande ${orderData.numero} a été confirmée !`,
          url: window.location.href
        })
      } catch (error) {
        console.error('Erreur lors du partage:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête de confirmation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <FiCheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Commande confirmée !
            </h1>
            
            <p className="text-gray-600 mb-6">
              Votre commande a été passée avec succès. Vous recevrez une confirmation par email.
            </p>

            {/* Numéro de commande */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 max-w-md mx-auto">
              <p className="text-sm text-gray-600 mb-1">Numéro de commande</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">{orderData.numero}</span>
                <button
                  onClick={copyOrderNumber}
                  className="ml-3 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-xs text-gray-700 transition-colors"
                >
                  {copied ? 'Copié !' : 'Copier'}
                </button>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={downloadInvoice}
                className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Télécharger facture
              </button>
              
              <button
                onClick={shareOrder}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiShare2 className="w-4 h-4 mr-2" />
                Partager
              </button>
              
              <button
                onClick={() => router.get('/buyer/orders')}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiEye className="w-4 h-4 mr-2" />
                Mes commandes
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Détails de la commande */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FiPackage className="w-5 h-5 mr-2 text-orange-500" />
                Détails de la commande
              </h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {orderData.etat}
              </span>
            </div>

            {/* Produits commandés */}
            <div className="space-y-4 mb-6">
              {orderData.produits.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    {item.produit.images?.[0]?.url ? (
                      <img
                        src={`/storage/${item.produit.images[0].url}`}
                        alt={item.produit.nom}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <FiPackage className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.produit.nom}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Quantité: {item.quantite}
                    </p>
                    <p className="text-lg font-bold text-orange-500">
                      {(item.produit.prix * item.quantite).toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Récapitulatif des prix */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>{orderData.montant_total.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Frais de livraison</span>
                <span>{orderData.frais_livraison === 0 ? 'Gratuit' : `${orderData.frais_livraison.toLocaleString()} FCFA`}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{orderData.montant_final.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>

          {/* Informations de livraison et timeline */}
          <div className="space-y-8">
            {/* Informations de livraison */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiTruck className="w-5 h-5 mr-2 text-orange-500" />
                Informations de livraison
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FiUser className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Nom complet</p>
                    <p className="font-semibold text-gray-900">{orderData.informations_livraison.nom}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FiPhone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-semibold text-gray-900">{orderData.informations_livraison.telephone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Adresse</p>
                    <p className="font-semibold text-gray-900">
                      {orderData.informations_livraison.quartier}, {orderData.informations_livraison.ville}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {orderData.informations_livraison.adresse_complete}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FiClock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Délai de livraison estimé</p>
                    <p className="font-semibold text-gray-900">{orderData.delai_livraison}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline de commande */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiCalendar className="w-5 h-5 mr-2 text-orange-500" />
                Suivi de commande
              </h2>
              
              <div className="space-y-6">
                {/* Étape 1 - Confirmée */}
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600">Commande confirmée</p>
                    <p className="text-sm text-gray-600">
                      {new Date(orderData.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                {/* Étape 2 - En cours */}
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-yellow-600">En cours de traitement</p>
                    <p className="text-sm text-gray-600">Le vendeur prépare votre commande</p>
                  </div>
                </div>
                
                {/* Étape 3 - À venir */}
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-500">Expédition</p>
                    <p className="text-sm text-gray-600">Votre commande sera bientôt expédiée</p>
                  </div>
                </div>
                
                {/* Étape 4 - À venir */}
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-500">Livraison</p>
                    <p className="text-sm text-gray-600">Réception de votre commande</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations boutique */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Boutique</h2>
              
              <div className="space-y-3">
                <p className="font-semibold text-gray-900">{orderData.boutique.nom}</p>
                <div className="flex items-center space-x-2">
                  <FiPhone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{orderData.boutique.telephone}</span>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={() => router.get(`/boutique/${orderData.boutique.id}`)}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    Voir la boutique →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions en bas */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/buyer/dashboard"
              className="flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Retour au tableau de bord
            </Link>
            
            <Link
              to="/"
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Continuer mes achats
            </Link>
            
            <button
              onClick={() => router.get(`/orders/${orderData.id}/track`)}
              className="flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
            >
              <FiTruck className="w-4 h-4 mr-2" />
              Suivre ma commande
            </button>
          </div>
        </div>

        {/* Message de remerciement */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Merci pour votre confiance ! Nous vous tiendrons informé de l'évolution de votre commande.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Une confirmation a été envoyée à votre adresse email.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation