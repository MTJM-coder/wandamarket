import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import {
  FiUser, FiLock, FiBell, FiMail, FiPhone, FiMapPin,
  FiCreditCard, FiShield, FiGlobe, FiEye, FiEyeOff, FiCamera,
  FiTruck,
  FiCheck,
  FiPlus,
  FiX,
  FiRepeat,FiMenu
} from 'react-icons/fi';
import AuthenticatedLayout from './AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import SideBar2 from '@/Layouts/SideBar2';
import NavBar3 from '@/Layouts/NavBar3';
import SellerSideBar from '@/Layouts/sellerSideBar';

const Parametre = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Données fictives pour l'utilisateur
 
  const { props } = usePage();
  const user = props.user;
  const [activeTab, setActiveTab] = useState('compte');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [abonnement, setAbonnement] = useState("Gratuit");
  const [assistants, setAssistants] = useState([
    { id: 1, nom: "Jaudel", email: "jaudel@example.com", role: "Admin" },
  ]);
    
  
    const ajouterAssistant = () => {
      const email = prompt("Entrer l'email de l'assistant :");
      if (email) {
        setAssistants([...assistants, {
          id: Date.now(),
          nom: "Nouveau Assistant",
          email,
          role: "Éditeur"
        }]);
      }
    };
  
    const supprimerAssistant = (id) => {
      setAssistants(assistants.filter((a) => a.id !== id));
    };
  
    const [livraison, setLivraison] = useState({
      delaiTraitement: "1-2",
      zonesLivraison: ["Douala", "Yaoundé"],
      fraisLivraison: "1000",
      livraisonGratuite: "25000"
    });
  
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
      put('/parametre/update');
    };
  
    const [preview, setPreview] = useState(user.image || null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setData('image', file);
        setPreview(URL.createObjectURL(file));
      }
    };
  
    // Méthodes de paiement
    const paiements = [
      { id: 'mobile_money', label: 'Mobile Money', details: 'Orange Money, MTN Mobile Money' },
      { id: 'carte_credit', label: 'Carte de crédit', details: 'Visa, Mastercard' },
      { id: 'a_la_livraison', label: 'Paiement à la livraison', details: 'Espèces ou mobile money' }
    ];
  
    // Abonnements
    const abonnementsDisponibles = [
      { type: "Gratuit", montant: "0 FCFA", duree: "illimitée", produits: "5", commission: "15%" },
      { type: "Commission", montant: "0 FCFA + % sur ventes", duree: "illimitée", produits: "50", commission: "10%" },
      { type: "Standard", montant: "5 000 FCFA", duree: "1 mois", produits: "100", commission: "5%" },
      { type: "Premium", montant: "10 000 FCFA", duree: "1 mois", produits: "500", commission: "3%" },
      { type: "Entreprise", montant: "50 000 FCFA", duree: "1 mois", produits: "Illimité", commission: "2%" },
    ];
  
    const navigationItems = [
      { id: 'compte', label: 'Informations du compte', icon: FiUser },
      { id: 'abonnement', label: 'Abonnement', icon: FiCreditCard },
      { id: 'securite', label: 'Sécurité', icon: FiLock },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'paiements', label: 'Méthodes de paiement', icon: FiCreditCard },
      { id: 'confidentialite', label: 'Confidentialité', icon: FiShield },
      { id: 'assistants', label: 'Assistants', icon: FiUser },
      { id: 'livraison', label: 'Livraison', icon: FiTruck },
    ];
  
    // Fermer le menu mobile quand on sélectionne un onglet
    const handleTabChange = (tabId) => {
      setActiveTab(tabId);
      setIsMobileMenuOpen(false);
    };
  
    return (
      <div className="min-h-screen md:-mt-24 bg-gray-50 ">
         <SellerSideBar activeTab={''} setActiveTab={setActiveTab} className="md:hidden" />

        {/* Header Mobile */}
        <div className="lg:hidden bg-white shadow-sm border-b px-4  flex justify-between items-center">
          <h1 className="text-lg font-bold text-[#071726]">Paramètres</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <FiMenu className="w-5 h-5" />
          </button>
        </div>
  
        {/* Main Content */}
        <div className="lg:ml-24 mb-20">
          <div className="container mx-auto px-2 sm:px-4 py-4 lg:py-8 lg:mt-20">
            <div className="max-w-7xl mx-auto">
              {/* Header Desktop */}
              <div className="hidden lg:block mb-8">
                <h1 className="text-3xl font-bold text-[#071726] mb-2">Paramètres du compte</h1>
                <p className="text-gray-600">Gérez vos préférences et informations personnelles</p>
              </div>
  
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* Sidebar Navigation */}
                <div className={`
                  ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block
                  fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
                  bg-black bg-opacity-50 lg:bg-transparent
                `}>
                  <div className="w-64 lg:w-64 bg-white rounded-lg shadow p-4 h-fit
                    absolute lg:relative right-0 top-0 lg:top-auto
                    max-h-screen overflow-y-auto">
                    
                    {/* Close button mobile */}
                    <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b">
                      <h2 className="font-semibold text-[#071726]">Menu</h2>
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
  
                    <nav className="space-y-1">
                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id)}
                            className={`w-full text-left flex items-center px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition text-sm lg:text-base ${
                              activeTab === item.id 
                                ? 'bg-[#071726] text-white' 
                                : 'text-[#071726] hover:bg-gray-100'
                            }`}
                          >
                            <Icon className="mr-2 lg:mr-3 w-4 h-4 lg:w-5 lg:h-5" />
                            <span className="truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </div>
  
                {/* Content Area */}
                <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
                  {/* Compte Tab */}
                  {activeTab === 'compte' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-[#071726] mb-4 lg:mb-6">
                        Informations du compte
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                        {/* Photo de profil */}
                        <div className="flex flex-col sm:flex-row items-center mb-4 lg:mb-6">
                          <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gray-200 overflow-hidden mb-4 sm:mb-0 sm:mr-4 lg:mr-6">
                            <img
                              src={preview || 'https://ui-avatars.com/api/?name=Aïcha+Diallo&background=071726&color=fff'}
                              alt="Profil"
                              className="w-full h-full object-cover"
                            />
                            <label className="absolute bottom-0 right-0 bg-[#ec8d0c] text-white p-2 rounded-full cursor-pointer hover:bg-[#d97d0c]">
                              <FiCamera className="w-3 h-3 lg:w-4 lg:h-4" />
                              <input type="file" className="hidden" onChange={handleFileChange} />
                            </label>
                          </div>
                          <div className="text-center sm:text-left">
                            <h3 className="text-base lg:text-lg font-medium text-[#071726]">
                              {user.prenom} {user.nom}
                            </h3>
                            <p className="text-sm lg:text-base text-gray-600">
                              {user.role === 'vendeur' ? 'Vendeur' : 'Client'}
                            </p>
                          </div>
                        </div>
  
                        {/* Formulaire */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                            <input
                              type="text"
                              value={data.nom}
                              onChange={(e) => setData('nom', e.target.value)}
                              className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent text-sm lg:text-base"
                              required
                            />
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                            <input
                              type="text"
                              value={data.prenom}
                              onChange={(e) => setData('prenom', e.target.value)}
                              className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent text-sm lg:text-base"
                              required
                            />
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400 w-4 h-4" />
                              </div>
                              <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full pl-8 lg:pl-10 pr-3 lg:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent text-sm lg:text-base"
                                required
                              />
                            </div>
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="text-gray-400 w-4 h-4" />
                              </div>
                              <input
                                type="tel"
                                value={data.telephone}
                                onChange={(e) => setData('telephone', e.target.value)}
                                className="w-full pl-8 lg:pl-10 pr-3 lg:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent text-sm lg:text-base"
                                required
                              />
                            </div>
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMapPin className="text-gray-400 w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                value={data.ville}
                                onChange={(e) => setData('ville', e.target.value)}
                                className="w-full pl-8 lg:pl-10 pr-3 lg:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent text-sm lg:text-base"
                                required
                              />
                            </div>
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quartier *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMapPin className="text-gray-400 w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                value={data.quartier}
                                onChange={(e) => setData('quartier', e.target.value)}
                                className="w-full pl-8 lg:pl-10 pr-3 lg:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent text-sm lg:text-base"
                                required
                              />
                            </div>
                          </div>
                        </div>
  
                        <div className="flex justify-end pt-4">
                          <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto px-4 lg:px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] disabled:opacity-50 text-sm lg:text-base"
                          >
                            {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
  
                  {/* Sécurité Tab */}
                  {activeTab === 'securite' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-[#071726] mb-4 lg:mb-6">
                        Sécurité du compte
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                        <div>
                          <h3 className="text-base lg:text-lg font-medium text-[#071726] mb-4">
                            Changer le mot de passe
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mot de passe actuel *
                              </label>
                              <div className="relative">
                                <input
                                  type={showCurrentPassword ? "text" : "password"}
                                  value={data.current_password}
                                  onChange={(e) => setData('current_password', e.target.value)}
                                  className="w-full px-3 lg:px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent text-sm lg:text-base"
                                  placeholder="••••••••"
                                  required
                                />
                                <button
                                  type="button"
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                  {showCurrentPassword ? <FiEyeOff className="text-gray-400 w-4 h-4" /> : <FiEye className="text-gray-400 w-4 h-4" />}
                                </button>
                              </div>
                            </div>
  
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nouveau mot de passe *
                              </label>
                              <div className="relative">
                                <input
                                  type={showNewPassword ? "text" : "password"}
                                  value={data.password}
                                  onChange={(e) => setData('password', e.target.value)}
                                  className="w-full px-3 lg:px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent text-sm lg:text-base"
                                  placeholder="••••••••"
                                  required
                                />
                                <button
                                  type="button"
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                  {showNewPassword ? <FiEyeOff className="text-gray-400 w-4 h-4" /> : <FiEye className="text-gray-400 w-4 h-4" />}
                                </button>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Minimum 8 caractères avec chiffres et lettres
                              </p>
                            </div>
  
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmer le nouveau mot de passe *
                              </label>
                              <input
                                type={showNewPassword ? "text" : "password"}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent text-sm lg:text-base"
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
                            className="w-full sm:w-auto px-4 lg:px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] disabled:opacity-50 text-sm lg:text-base"
                          >
                            {processing ? 'Enregistrement...' : 'Mettre à jour le mot de passe'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
  
                  {/* Notifications Tab */}
                  {activeTab === 'notifications' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-[#071726] mb-4 lg:mb-6">
                        Préférences de notification
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                        <div>
                          <h3 className="text-base lg:text-lg font-medium text-[#071726] mb-4">Email</h3>
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
                          <h3 className="text-base lg:text-lg font-medium text-[#071726] mb-4">SMS</h3>
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
                          <h3 className="text-base lg:text-lg font-medium text-[#071726] mb-4">
                            Langue des notifications
                          </h3>
                          <select
                            value={data.langue}
                            onChange={(e) => setData('langue', e.target.value)}
                            className="w-full sm:w-64 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent text-sm lg:text-base"
                          >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                          </select>
                        </div>
  
                        <div className="flex justify-end pt-4">
                          <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto px-4 lg:px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] disabled:opacity-50 text-sm lg:text-base"
                          >
                            {processing ? 'Enregistrement...' : 'Enregistrer les préférences'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
  
                  {/* Paiements Tab */}
                  {activeTab === 'paiements' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-[#071726] mb-4 lg:mb-6">
                        Méthodes de paiement
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                        <div>
                          <h3 className="text-base lg:text-lg font-medium text-[#071726] mb-4">
                            Méthode préférée
                          </h3>
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
                            className="w-full sm:w-auto px-4 lg:px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] disabled:opacity-50 text-sm lg:text-base"
                          >
                            {processing ? 'Enregistrement...' : 'Enregistrer les préférences'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
  
                  {/* Confidentialité Tab */}
                  {activeTab === 'confidentialite' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-[#071726] mb-4 lg:mb-6">
                        Confidentialité
                      </h2>
                      <div className="space-y-4 lg:space-y-6">
                        <div>
                          <h3 className="text-base lg:text-lg font-medium text-[#071726] mb-4">
                            Visibilité du compte
                          </h3>
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
                          <h3 className="text-base lg:text-lg font-medium text-[#071726] mb-4">
                            Données personnelles
                          </h3>
                          <div className="space-y-4">
                            <button
                              type="button"
                              className="w-full sm:w-auto px-4 py-2 text-[#071726] border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm lg:text-base"
                            >
                              Télécharger mes données
                            </button>
                            <div className="border-t border-gray-200 pt-4">
                              <button
                                type="button"
                                className="w-full sm:w-auto px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition text-sm lg:text-base"
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
  
                  {/* Abonnement Tab */}
                  {activeTab === 'abonnement' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-[#071726] mb-4 lg:mb-6">
                        Mon abonnement
                      </h2>
                      <div className="space-y-4 lg:space-y-6">
                        {/* Abonnement actuel */}
                        <div className="bg-orange-50 p-4 lg:p-6 rounded-lg">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div>
                              <h4 className="font-semibold text-lg">{abonnement}</h4>
                              <p className="text-gray-600">Plan actuel</p>
                            </div>
                            <div className="text-left sm:text-right">
                              <div className="text-xl lg:text-2xl font-bold text-orange-600">
                                {abonnementsDisponibles.find(a => a.type === abonnement)?.montant}
                              </div>
                              <div className="text-sm text-gray-500">
                                par {abonnementsDisponibles.find(a => a.type === abonnement)?.duree}
                              </div>
                            </div>
                          </div>
                        </div>
  
                        {/* Plans disponibles */}
                        <div>
                          <h4 className="text-base lg:text-lg font-semibold mb-4">Plans disponibles</h4>
                          <div className="grid gap-3 lg:gap-4">
                            {abonnementsDisponibles.map((plan, index) => (
                              <div
                                key={index}
                                className={`p-3 lg:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  abonnement === plan.type
                                    ? 'border-orange-500 bg-orange-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => setAbonnement(plan.type)}
                              >
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-sm lg:text-base">{plan.type}</h5>
                                    <p className="text-xs lg:text-sm text-gray-600 mt-1">
                                      {plan.produits} produits • Commission {plan.commission}
                                    </p>
                                  </div>
                                  <div className="text-left sm:text-right">
                                    <div className="font-bold text-sm lg:text-base">{plan.montant}</div>
                                    <div className="text-xs lg:text-sm text-gray-500">/ {plan.duree}</div>
                                  </div>
                                </div>
                                {abonnement === plan.type && (
                                  <div className="mt-2 flex items-center gap-1 text-orange-600 text-xs lg:text-sm">
                                    <FiCheck className="w-3 h-3 lg:w-4 lg:h-4" />
                                    Plan actuel
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
  
                  {/* Assistants Tab */}
                  {activeTab === 'assistants' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-[#071726] mb-4 lg:mb-6">
                        Gestion des assistants
                      </h2>
  
                      <div className="space-y-3 lg:space-y-4 mb-6">
                        {assistants.map((assistant) => (
                          <div key={assistant.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 lg:p-4 border rounded-lg gap-3">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <FiUser className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm lg:text-base truncate">{assistant.nom}</div>
                                <div className="text-xs lg:text-sm text-gray-500 truncate">{assistant.email}</div>
                                <div className="text-xs text-orange-600">{assistant.role}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                              <select
                                value={assistant.role}
                                onChange={(e) => {
                                  setAssistants(assistants.map(a =>
                                    a.id === assistant.id ? { ...a, role: e.target.value } : a
                                  ));
                                }}
                                className="flex-1 sm:flex-none text-xs lg:text-sm border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="Éditeur">Éditeur</option>
                                <option value="Admin">Admin</option>
                                <option value="Lecture seule">Lecture seule</option>
                              </select>
                              <button
                                className="text-red-500 hover:text-red-700 p-2"
                                onClick={() => supprimerAssistant(assistant.id)}
                              >
                                <FiX className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
  
                      <button
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm lg:text-base"
                        onClick={() => setActiveTab("addAssist")}
                      >
                        <FiPlus className="w-4 h-4" />
                        Ajouter un assistant
                      </button>
  
                      <div className="mt-6 p-3 lg:p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2 text-sm lg:text-base">Rôles et permissions</h4>
                        <div className="text-xs lg:text-sm text-gray-600 space-y-1">
                          <div><strong>Admin :</strong> Accès complet à tous les paramètres</div>
                          <div><strong>Éditeur :</strong> Peut gérer les produits et commandes</div>
                          <div><strong>Lecture seule :</strong> Peut seulement consulter les données</div>
                        </div>
                      </div>
                    </div>
                  )}
  
                  {/* Livraison Tab */}
                  {activeTab === 'livraison' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-[#071726] mb-4 lg:mb-6">
                        Paramètres de livraison
                      </h2>
  
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Délai de traitement</label>
                            <select
                              value={livraison.delaiTraitement}
                              onChange={(e) => setLivraison({ ...livraison, delaiTraitement: e.target.value })}
                              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
                            >
                              <option value="1">1 jour</option>
                              <option value="1-2">1-2 jours</option>
                              <option value="2-3">2-3 jours</option>
                              <option value="3-5">3-5 jours</option>
                              <option value="5-7">5-7 jours</option>
                            </select>
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium mb-2">Frais de livraison (FCFA)</label>
                            <input
                              type="number"
                              value={livraison.fraisLivraison}
                              onChange={(e) => setLivraison({ ...livraison, fraisLivraison: e.target.value })}
                              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                            />
                          </div>
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium mb-2">Livraison gratuite à partir de (FCFA)</label>
                          <input
                            type="number"
                            value={livraison.livraisonGratuite}
                            onChange={(e) => setLivraison({ ...livraison, livraisonGratuite: e.target.value })}
                            className="w-full sm:max-w-xs p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                          />
                        </div>
  
                        <div>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                            <label className="block text-sm font-medium">Zones de livraison</label>
                            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-blue-700">
                              <FiPlus className="w-4 h-4" />
                              Ajouter zone
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {livraison.zonesLivraison.map((zone, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-1 px-2 lg:px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs lg:text-sm"
                              >
                                {zone}
                                <button className="text-orange-500 hover:text-orange-700">
                                  <FiX className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
  
                  {/* Add Assistant Tab */}
                  {activeTab === 'addAssist' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-[#071726] mb-4 lg:mb-6">
                        Ajouter un assistant
                      </h2>
                      
                      <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                          Ajoutez un assistant pour vous aider à gérer votre boutique. 
                          Assurez-vous que cette personne possède déjà un compte WandaMarket, 
                          sinon une invitation lui sera envoyée par WhatsApp ou e-mail pour créer son compte.
                        </p>
  
                        <form className="space-y-4 lg:space-y-6">
                          <div>
                            <label htmlFor="email" className="block font-medium text-gray-800 text-sm mb-2">
                              Email ou numéro de téléphone <span className="text-red-500">*</span>
                            </label>
                            <input 
                              type="text" 
                              name="email" 
                              id="email" 
                              placeholder="ex: exemple@mail.com ou +237 6XX XX XX XX"
                              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm lg:text-base"
                            />
                          </div>
  
                          <div>
                            <label htmlFor="role" className="block font-medium text-gray-800 text-sm mb-2">
                              Rôle de l'assistant
                            </label>
                            <select 
                              name="role" 
                              id="role" 
                              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm lg:text-base"
                            >
                              <option value="admin">Administrateur - accès complet</option>
                              <option value="editeur">Éditeur - peut gérer les produits et commandes</option>
                              <option value="readonly">Lecture seule - consultation uniquement</option>
                            </select>
                          </div>
  
                          <div>
                            <label className="block font-medium text-gray-800 text-sm mb-2">
                              Cet assistant possède-t-il déjà un compte WandaMarket ?
                            </label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                              <label className="flex items-center space-x-2">
                                <input type="radio" value="oui" name="compte" className="accent-orange-500" />
                                <span className="text-sm lg:text-base">Oui</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input type="radio" value="non" name="compte" className="accent-orange-500" />
                                <span className="text-sm lg:text-base">Non</span>
                              </label>
                            </div>
                          </div>
  
                          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                            <button 
                              type="submit" 
                              className="flex items-center justify-center gap-1 px-4 lg:px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition text-sm lg:text-base"
                            >
                              <FiPlus className="w-4 h-4" /> Ajouter
                            </button>
                            
                            <button 
                              type="button" 
                              className="flex items-center justify-center gap-1 px-4 lg:px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition text-sm lg:text-base"
                              onClick={() => setActiveTab('assistants')}
                            >
                              <FiRepeat className="w-4 h-4" /> Annuler
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default Parametre;