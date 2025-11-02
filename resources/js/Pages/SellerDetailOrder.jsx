import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Package, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Printer,
  MessageSquare,
  Edit,
  Save,
  X,
  Copy,
  Download,
  RefreshCw
} from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { formatDate } from 'date-fns';

const OrderDetailsPage = () => {
  const {props}=usePage()
  const order=props.orders
  const [orderStatus, setOrderStatus] = useState(order.etat);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTrackingInput, setShowTrackingInput] = useState(false);
  const [notes, setNotes] = useState('');
  const [showNotesInput, setShowNotesInput] = useState(false);

  // Données de la commande simulée
  const orderData = {
    id: '#12345',
    date: '2024-09-15',
    customer: {
      name: 'Alice Dubois',
      email: 'alice.dubois@email.com',
      phone: '+33 6 12 34 56 78',
      address: {
        street: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France'
      }
    },
    products: [
      {
        id: 1,
        name: 'Savon bio lavande',
        sku: 'SAV-LAV-001',
        price: 8.50,
        quantity: 2,
        image: '/api/placeholder/60/60'
      },
      {
        id: 2,
        name: 'Crème visage hydratante',
        sku: 'CRE-VIS-002',
        price: 24.90,
        quantity: 1,
        image: '/api/placeholder/60/60'
      }
    ],
    payment: {
      method: 'Carte bancaire',
      status: 'paid',
      amount: 41.90,
      fees: 2.10,
      netAmount: 39.80
    },
    shipping: {
      method: 'Livraison standard',
      cost: 4.90,
      estimatedDelivery: '2024-09-18'
    },
  
  };

  const orderTimeline=[
     { status: 'pending', date: order.created_at, label: 'Commande reçue' },
      { status: 'processing', date: order.date_traitement, label: 'Commande en traitement' },
      { status: 'shipped', date: order.date_expedition, label: 'Expédiée' },
      { status: 'delivered', date: order.date_livre, label: 'Livrée' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'en attente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'en cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expédiée': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'livrée': return 'bg-green-100 text-green-800 border-green-200';
      case 'annulée': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      // case 'pending': return 'En attente';
      case 'en cours': return 'En traitement';
      case 'expédiée': return 'Expédiée';
      case 'livrée': return 'Livrée';
      case 'annulée': return 'Annulée';
      default: return status;
    }
  };

  const [FormData,setFormData]=useState({
    id_order:order.id,
    new_status:null
})
  const handleStatusChange = (newStatus) => {
    setOrderStatus(newStatus);
    // if (newStatus === 'shipped' && !trackingNumber) {
    //   setShowTrackingInput(true);
    // }
    setFormData(FormData.new_status=newStatus)
    router.post('/update/status/order',FormData)
  };

  const handleSaveTracking = () => {
    setShowTrackingInput(false);
    
    console.log('Numéro de suivi sauvegardé:', trackingNumber);
  };

  const handleSaveNotes = () => {
    setShowNotesInput(false);
    console.log('Notes sauvegardées:', notes);
  };

  const subtotal = order.commande_produits.reduce((sum, product) => sum + (product.prix_unitaire* product.quantite), 0);
  const total = subtotal ;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={()=>window.history.back()} className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
               
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Commande #CMD-{order.id}</h1>
                <p className="text-sm text-gray-500">Passée le {new Date(order.created_at).toLocaleString('fr-FR')}</p>
              </div>
            </div>
            {/* <div className="flex items-center space-x-3">
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </button>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Facture
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Statut et actions */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Statut de la commande</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(orderStatus)}`}>
                  {getStatusText(orderStatus)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[ 'en cours', 'expédiée', 'livrée'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      orderStatus === status 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {getStatusText(status)}
                  </button>
                ))}
              </div>

              {/* Numéro de suivi */}
              {orderStatus === 'shipped' && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Numéro de suivi</label>
                    {!showTrackingInput && (
                      <button 
                        onClick={() => setShowTrackingInput(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {showTrackingInput ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Entrez le numéro de suivi"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button 
                        onClick={handleSaveTracking}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowTrackingInput(false)}
                        className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {trackingNumber || 'Aucun numéro de suivi'}
                      </span>
                      {trackingNumber && (
                        <button className="text-gray-400 hover:text-gray-600">
                          <Copy className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Chronologie */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Chronologie</h2>
              <div className="space-y-4">
                {orderTimeline.map((event, index) => {
                  const isCompleted = event.date !== null;
                  const isCurrent = event.etat === order.etat;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-100' : isCurrent ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : isCurrent ? (
                          <RefreshCw className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>
                          {event.label}
                        </p>
                        {event.date && (
                          <p className="text-xs text-gray-500 mt-1">{new Date(event.date).toLocaleDateString('fr-FR')}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Produits commandés */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Produits commandés</h2>
              <div className="space-y-4">
                {order.commande_produits.map((cp) => (
                  <div key={cp.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <img src={`/storage/${cp.produit?.images[0]?.url}`} alt="" className="w-16 h-16 rounded-md text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{cp.produit.nom}</h3>
                      {/* <p className="text-xs text-gray-500">SKU: {cp.sku}</p> */}
                      <p className="text-sm text-gray-600">Quantité: {cp.quantite}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">FCFA {cp.prix_unitaire}</p>
                      <p className="text-xs text-gray-500">FCFA {(cp.prix_unitaire * cp.quantite.toFixed(2))} total</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Récapitulatif des prix */}
              <div className="border-t border-gray-200 mt-6 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="text-gray-900">FCFA {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frais de livraison</span>
                  <span className="text-gray-900">FCFA -</span>
                </div>
                <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">FCFA {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes internes */}
            {/* <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Notes internes</h2>
                <button 
                  onClick={() => setShowNotesInput(!showNotesInput)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              {showNotesInput ? (
                <div className="space-y-3">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ajoutez des notes sur cette commande..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleSaveNotes}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Sauvegarder
                    </button>
                    <button 
                      onClick={() => setShowNotesInput(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 text-sm">
                  {notes || 'Aucune note ajoutée pour cette commande.'}
                </p>
              )}
            </div> */}
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            
            {/* Informations client */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Client</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order?.user?.nom+' '+order?.user?.nom}</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href={`mailto:${order?.user?.email}`} className="hover:text-blue-600">
                    {order?.user?.email}
                  </a>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href={`tel:${order?.user?.telephone}`} className="hover:text-blue-600">
                    {order?.user?.telephone}
                  </a>
                </div>
              </div>
              
              <a href={`tel:${order?.user?.telephone}`}>
              <button className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contacter le client
              </button>
              </a>
            </div>

            {/* Adresse de livraison */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Infos de livraison</h2>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-medium text-gray-900">Nom: {order?.client_nom || order?.user?.nom+" "+order?.user?.nom }</p>
                <p><span className='font-bold'>Ville:</span> {order.client_ville || order?.user?.ville}</p>
                <p><span className='font-bold'>quartier:</span> {order.client_quartier || order?.user?.quartier}</p>
                <p><span className='font-bold'>Téléphone:</span> {order.client_telephone || order?.user?.telephone}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Méthode:</span> {order?.client_quartier != order?.boutique?.ville?'Expédition':'Livraison standard'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Livraison estimée:</span> -
                </p>
              </div>
            </div>

            {/* Informations de paiement */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Paiement</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Méthode</span>
                  <span className="text-gray-900">{orderData.payment.method}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Statut</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Payé
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Montant total</span>
                  <span className="text-gray-900">FCFA {order.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Commission marketplace</span>
                  <span className="text-red-600">-FCFA {orderData.payment.fees}</span>
                </div>
                <div className="flex justify-between text-sm font-medium border-t border-gray-200 pt-2">
                  <span className="text-gray-900">Montant net</span>
                  <span className="text-gray-900">FCFA {orderData.payment.netAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;