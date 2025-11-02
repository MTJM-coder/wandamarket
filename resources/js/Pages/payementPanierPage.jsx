import React, { useState } from 'react'
import {
    FiCreditCard,
    FiSmartphone,
    FiDollarSign,
    FiPackage,
    FiMapPin,
    FiUser,
    FiPhone,
    FiEdit2,
    FiArrowLeft,
    FiShield,
    FiCheck,
    FiAlertCircle
} from 'react-icons/fi'
import { usePage, router } from '@inertiajs/react'

const OrderSummaryPayment = () => {
    const { props } = usePage()
    const order = props.order || {}
    const auth = props.auth

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showEditDelivery, setShowEditDelivery] = useState(false)

    // Données de la commande (simulées si pas dans props)
    const orderData = {
        id: order.id || Date.now(),
        produits: order.items || [
            {
                id: 1,
                nom: 'Boite tout en un',
                prix: 2999,
                quantite: 1,
                image: '/path-to-image.jpg'
            }
        ],
        livraison: order.delivery_info || {
            nom: 'Merlando',
            telephone: '673917550',
            ville: 'Douala',
            quartier: 'Akwa',
            adresse_complete: 'Rue de la Liberté, Akwa, Douala'
        },
        montant_produits: 2999,
        frais_livraison: 500,
        taxes: 0,
        montant_total: 3499
    }

    // Méthodes de paiement disponibles
    const paymentMethods = [
        {
            id: 'mobile_money',
            name: 'Mobile Money',
            icon: <FiSmartphone className="w-6 h-6" />,
            description: 'Orange Money, MTN MoMo',
            popular: true,
            providers: [
                { id: 'orange', name: 'Orange Money', color: 'bg-orange-500' },
                { id: 'mtn', name: 'MTN MoMo', color: 'bg-yellow-500' }
            ]
        },
        // {
        //   id: 'card',
        //   name: 'Carte bancaire',
        //   icon: <FiCreditCard className="w-6 h-6" />,
        //   description: 'Visa, Mastercard',
        //   popular: false
        // },
        {
            id: 'cash',
            name: 'Paiement à la livraison',
            icon: <FiDollarSign className="w-6 h-6" />,
            description: 'Payez en espèces au livreur',
            popular: false
        }
    ]
    console.log(order);
    // Fonction pour traiter le paiement
    const handlePayment = async () => {
        if (!selectedPaymentMethod) {
            alert('Veuillez sélectionner une méthode de paiement')
            return
        }

        if (selectedPaymentMethod === 'mobile_money' && !phoneNumber) {
            alert('Veuillez entrer votre numéro de téléphone')
            return
        }

        setIsProcessing(true)

        try {
            // Simuler l'appel API pour traiter le paiement
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Rediriger vers la page de confirmation
            router.post('/order/process-payment', {
                order_data: orderData,
                payment_method: selectedPaymentMethod,
                phone_number: phoneNumber
            })
        } catch (error) {
            console.error('Erreur de paiement:', error)
            alert('Une erreur est survenue lors du paiement')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* En-tête */}
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
                    >
                        <FiArrowLeft className="w-5 h-5 mr-2" />
                        Retour
                    </button>

                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Récapitulatif et Paiement
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Vérifiez votre commande et procédez au paiement
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne principale - Paiement */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Méthodes de paiement */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <FiCreditCard className="w-6 h-6 mr-3 text-orange-500" />
                                Choisissez votre méthode de paiement
                            </h2>

                            <div className="space-y-4">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedPaymentMethod === method.id
                                                ? 'border-orange-500 bg-orange-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        onClick={() => setSelectedPaymentMethod(method.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-3 rounded-lg ${selectedPaymentMethod === method.id
                                                        ? 'bg-orange-100 text-orange-600'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {method.icon}
                                                </div>

                                                <div>
                                                    <div className="flex items-center">
                                                        <h3 className="font-semibold text-gray-900">
                                                            {method.name}
                                                        </h3>
                                                        {method.popular && (
                                                            <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                                                Populaire
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600">{method.description}</p>
                                                </div>
                                            </div>

                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === method.id
                                                    ? 'border-orange-500 bg-orange-500'
                                                    : 'border-gray-300'
                                                }`}>
                                                {selectedPaymentMethod === method.id && (
                                                    <FiCheck className="w-3 h-3 text-white" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Options pour Mobile Money */}
                                        {method.id === 'mobile_money' && selectedPaymentMethod === method.id && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    {method.providers.map((provider) => (
                                                        <div
                                                            key={provider.id}
                                                            className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer ${provider.id === 'orange' ? 'border-orange-200 bg-orange-50' : 'border-yellow-200 bg-yellow-50'
                                                                }`}
                                                        >
                                                            <div className={`w-4 h-4 rounded ${provider.color}`}></div>
                                                            <span className="text-sm font-medium">{provider.name}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Numéro de téléphone
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        placeholder="6XX XXX XXX"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Informations de livraison */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                    <FiMapPin className="w-6 h-6 mr-3 text-blue-500" />
                                    Adresse de livraison
                                </h2>
                                <button
                                    onClick={() => setShowEditDelivery(true)}
                                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    <FiEdit2 className="w-4 h-4 mr-1" />
                                    Modifier
                                </button>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <FiUser className="w-5 h-5 text-gray-400" />
                                        <span className="font-semibold text-gray-900">
                                            {order[0].client_nom}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <FiPhone className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-700">{order[0].client_telephone}</span>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-gray-700">{order[0].client_quartier}</p>
                                            <p className="text-sm text-gray-500">
                                                {order.client_quartier}, {order.client_ville}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sécurité */}
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <FiShield className="w-5 h-5 text-orange-600 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-orange-900 mb-1">
                                        Paiement sécurisé
                                    </h3>
                                    <p className="text-sm text-orange-700">
                                        Vos informations de paiement sont cryptées et sécurisées.
                                        Nous ne stockons jamais vos données bancaires.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Récapitulatif */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <FiPackage className="w-6 h-6 mr-3 text-purple-500" />
                                Votre commande
                            </h2>

                            {/* Produits */}
                            {order.map((commande) => (
                                <div key={commande.id} className="space-y-4 mb-6">
                                    {commande.commande_produits?.map((produit) => (
                                        <div key={produit.id} className="flex items-start space-x-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                                {produit.produit?.images?.[0]?.url ? (
                                                    <img
                                                        src={`/storage/${produit.produit.images[0].url}`}
                                                        alt={produit.produit.nom}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <FiPackage className="w-8 h-8 text-gray-400" />
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 text-sm">
                                                    {produit.produit?.nom}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    Quantité : {produit.quantite}
                                                </p>
                                                <p className="font-bold text-gray-900">
                                                    {produit.prix_total?.toLocaleString()} FCFA
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* Récapitulatif des coûts */}
                            <div className="border-t border-gray-200 pt-4 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Sous-total</span>
                                    <span>
                                        {order
                                            .reduce((sum, cmd) => sum + (cmd.montant_total || 0), 0)
                                            .toLocaleString()}{" "}
                                        FCFA
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Livraison</span>
                                    <span>Gratuit</span>
                                </div>

                                {/* Taxes si disponibles */}
                                {order.some((cmd) => cmd.taxes > 0) && (
                                    <div className="flex justify-between text-gray-600">
                                        <span>Taxes</span>
                                        <span>
                                            {order
                                                .reduce((sum, cmd) => sum + (cmd.taxes || 0), 0)
                                                .toLocaleString()}{" "}
                                            FCFA
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>
                                        {order
                                            .reduce((sum, cmd) => sum + (cmd.montant_total || 0), 0)
                                            .toLocaleString()}{" "}
                                        FCFA
                                    </span>
                                </div>
                            </div>

                            {/* Bouton de paiement */}
                            <button
                                onClick={handlePayment}
                                disabled={!selectedPaymentMethod || isProcessing}
                                className="w-full mt-6 px-6 py-4 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Traitement...
                                    </>
                                ) : (
                                    <>
                                        <FiCreditCard className="w-5 h-5 mr-2" />
                                        Procéder au paiement
                                    </>
                                )}
                            </button>

                            {/* Note sur la livraison */}
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-start space-x-2">
                                    <FiAlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                                    <p className="text-sm text-blue-700">
                                        Livraison estimée sous 2-3 jours ouvrables dans la région de{" "}
                                        {orderData.livraison.ville}.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
 
  )
}

export default OrderSummaryPayment