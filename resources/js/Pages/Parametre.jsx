import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { 
  FiUser, FiLock, FiBell, FiMail, FiPhone, FiMapPin, 
  FiCreditCard, FiShield, FiGlobe, FiEye, FiEyeOff, FiCamera 
} from 'react-icons/fi';
import AuthenticatedLayout from './AuthenticatedLayout';

const Parametre = () => {
  // Données fictives pour l'utilisateur
  const user = {
    id: 1,
    nom: 'ARTHUR',
    prenom: 'DJATCHE',
    email: 'wdows280@gmail.com',
    telephone: '+237 686865807',
    ville: 'Douala',
    quartier: 'pk8',
    image: '/images/profil/aicha.jpg',
    role: 'vendeur',
    boutique: {
      nom: 'Mode Africaine by Aïcha',
      ville: 'douala',
      quartier: 'Mboppi'
    }
  };

  const [activeTab, setActiveTab] = useState('compte');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { data, setData, put, processing, errors } = useForm({
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    telephone: user.telephone,
    ville: user.ville,
    quartier: user.quartier,
    image: null,
    current_password: '',
    password: '',
    password_confirmation: '',
    notification_email: true,
    notification_sms: true,
    langue: 'fr',
    mode_paiement: 'mobile_money',
    visibilite: 'public'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put('/parametres/update');
  };

  const handleFileChange = (e) => {
    setData('image', e.target.files[0]);
  };

  // Méthodes de paiement fictives
  const paiements = [
    { id: 'mobile_money', label: 'Mobile Money', details: 'Orange Money, MTN Mobile Money' },
    { id: 'carte_credit', label: 'Carte de crédit', details: 'Visa, Mastercard' },
    { id: 'a_la_livraison', label: 'Paiement à la livraison', details: 'Espèces ou mobile money' }
  ];

  return (
    <AuthenticatedLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-2xl font-bold">
            <span className="text-[#071726]">WANDA</span>
            <span className="text-[#ec8d0c]">MARKET</span>
          </Link>
          <Link href="/produit" className="text-[#071726] hover:text-[#ec8d0c] transition">
            Retour aux achats
          </Link>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#071726] mb-2">Paramètres du compte</h1>
          <p className="text-gray-600 mb-8">Gérez vos préférences et informations personnelles</p>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white rounded-lg shadow p-4 h-fit">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('compte')}
                  className={`w-full text-left flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'compte' ? 'bg-[#071726] text-white' : 'text-[#071726] hover:bg-gray-100'}`}
                >
                  <FiUser className="mr-3" />
                  Informations du compte
                </button>
                <button
                  onClick={() => setActiveTab('securite')}
                  className={`w-full text-left flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'securite' ? 'bg-[#071726] text-white' : 'text-[#071726] hover:bg-gray-100'}`}
                >
                  <FiLock className="mr-3" />
                  Sécurité
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'notifications' ? 'bg-[#071726] text-white' : 'text-[#071726] hover:bg-gray-100'}`}
                >
                  <FiBell className="mr-3" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('paiements')}
                  className={`w-full text-left flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'paiements' ? 'bg-[#071726] text-white' : 'text-[#071726] hover:bg-gray-100'}`}
                >
                  <FiCreditCard className="mr-3" />
                  Méthodes de paiement
                </button>
                <button
                  onClick={() => setActiveTab('confidentialite')}
                  className={`w-full text-left flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'confidentialite' ? 'bg-[#071726] text-white' : 'text-[#071726] hover:bg-gray-100'}`}
                >
                  <FiShield className="mr-3" />
                  Confidentialité
                </button>
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
              {/* Compte Tab */}
              {activeTab === 'compte' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#071726] mb-6">Informations du compte</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center mb-6">
                      <div className="relative w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 md:mb-0 md:mr-6">
                        <img 
                          src={user.image || 'https://ui-avatars.com/api/?name=Aïcha+Diallo&background=071726&color=fff'} 
                          alt="Profil" 
                          className="w-full h-full object-cover"
                        />
                        <label className="absolute bottom-0 right-0 bg-[#ec8d0c] text-white p-2 rounded-full cursor-pointer hover:bg-[#d97d0c]">
                          <FiCamera className="w-4 h-4" />
                          <input type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-[#071726]">{user.prenom} {user.nom}</h3>
                        <p className="text-gray-600">{user.role === 'vendeur' ? 'Vendeur' : 'Client'}</p>
                        {user.role === 'vendeur' && (
                          <p className="text-sm text-gray-500 mt-1">
                            Boutique: {user.boutique.nom}, {user.boutique.quartier}, {user.boutique.ville}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                        <input
                          type="text"
                          value={data.nom}
                          onChange={(e) => setData('nom', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                        <input
                          type="text"
                          value={data.prenom}
                          onChange={(e) => setData('prenom', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMail className="text-gray-400" />
                          </div>
                          <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiPhone className="text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            value={data.telephone}
                            onChange={(e) => setData('telephone', e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMapPin className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={data.ville}
                            onChange={(e) => setData('ville', e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quartier *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMapPin className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={data.quartier}
                            onChange={(e) => setData('quartier', e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] disabled:opacity-50"
                      >
                        {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Sécurité Tab */}
              {activeTab === 'securite' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#071726] mb-6">Sécurité du compte</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#071726] mb-4">Changer le mot de passe</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel *</label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              value={data.current_password}
                              onChange={(e) => setData('current_password', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                              placeholder="••••••••"
                              required
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe *</label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              value={data.password}
                              onChange={(e) => setData('password', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                              placeholder="••••••••"
                              required
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Minimum 8 caractères avec chiffres et lettres</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe *</label>
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] disabled:opacity-50"
                      >
                        {processing ? 'Enregistrement...' : 'Mettre à jour le mot de passe'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#071726] mb-6">Préférences de notification</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#071726] mb-4">Email</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              id="notification_email"
                              checked={data.notification_email}
                              onChange={(e) => setData('notification_email', e.target.checked)}
                              className="h-4 w-4 text-[#ec8d0c] focus:ring-[#ec8d0c] border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notification_email" className="font-medium text-gray-700">
                              Recevoir les notifications par email
                            </label>
                            <p className="text-gray-500">Commandes, messages, promotions et actualités</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-[#071726] mb-4">SMS</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              id="notification_sms"
                              checked={data.notification_sms}
                              onChange={(e) => setData('notification_sms', e.target.checked)}
                              className="h-4 w-4 text-[#ec8d0c] focus:ring-[#ec8d0c] border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notification_sms" className="font-medium text-gray-700">
                              Recevoir les notifications par SMS
                            </label>
                            <p className="text-gray-500">Alertes importantes et confirmations de commande</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-[#071726] mb-4">Langue des notifications</h3>
                      <select
                        value={data.langue}
                        onChange={(e) => setData('langue', e.target.value)}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] disabled:opacity-50"
                      >
                        {processing ? 'Enregistrement...' : 'Enregistrer les préférences'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Paiements Tab */}
              {activeTab === 'paiements' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#071726] mb-6">Méthodes de paiement</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#071726] mb-4">Méthode préférée</h3>
                      <div className="space-y-4">
                        {paiements.map((methode) => (
                          <div key={methode.id} className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                type="radio"
                                id={`paiement_${methode.id}`}
                                name="mode_paiement"
                                value={methode.id}
                                checked={data.mode_paiement === methode.id}
                                onChange={(e) => setData('mode_paiement', e.target.value)}
                                className="h-4 w-4 text-[#ec8d0c] focus:ring-[#ec8d0c] border-gray-300"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor={`paiement_${methode.id}`} className="font-medium text-gray-700">
                                {methode.label}
                              </label>
                              <p className="text-gray-500">{methode.details}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] disabled:opacity-50"
                      >
                        {processing ? 'Enregistrement...' : 'Enregistrer les préférences'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Confidentialité Tab */}
              {activeTab === 'confidentialite' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#071726] mb-6">Confidentialité</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#071726] mb-4">Visibilité du compte</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              type="radio"
                              id="visibilite_public"
                              name="visibilite"
                              value="public"
                              checked={data.visibilite === 'public'}
                              onChange={(e) => setData('visibilite', e.target.value)}
                              className="h-4 w-4 text-[#ec8d0c] focus:ring-[#ec8d0c] border-gray-300"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="visibilite_public" className="font-medium text-gray-700">
                              Compte public
                            </label>
                            <p className="text-gray-500">Tout le monde peut voir votre profil et vos activités</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              type="radio"
                              id="visibilite_prive"
                              name="visibilite"
                              value="prive"
                              checked={data.visibilite === 'prive'}
                              onChange={(e) => setData('visibilite', e.target.value)}
                              className="h-4 w-4 text-[#ec8d0c] focus:ring-[#ec8d0c] border-gray-300"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="visibilite_prive" className="font-medium text-gray-700">
                              Compte privé
                            </label>
                            <p className="text-gray-500">Seuls vos contacts peuvent voir votre profil</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-[#071726] mb-4">Données personnelles</h3>
                      <div className="space-y-4">
                        <button
                          type="button"
                          className="px-4 py-2 text-[#071726] border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                          Télécharger mes données
                        </button>
                        <div className="border-t border-gray-200 pt-4">
                          <button
                            type="button"
                            className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                          >
                            Supprimer mon compte
                          </button>
                          <p className="text-sm text-gray-500 mt-2">
                            Cette action est irréversible et supprimera toutes vos données de notre plateforme.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </AuthenticatedLayout>
  );
};

export default Parametre;