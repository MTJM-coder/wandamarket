import React, { useState, useRef } from 'react'
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiCamera,
  FiEye,
  FiEyeOff,
  FiLock,
  FiShield,
  FiCreditCard,
  FiTruck,
  FiHeart,
  FiSettings,
  FiTrash2,
  FiCheck,
  FiAlertTriangle,
  FiUpload
} from 'react-icons/fi'
import NavBar2 from '@/Layouts/Navbar2'
import SideBar2 from '@/Layouts/SideBar2'
import { usePage, router } from '@inertiajs/react'
import AlertMessage from '@/Layouts/AlertMessage'
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export default function BuyerProfile() {
  const { props } = usePage()
  const auth = props.auth
  const user = auth?.user || {}
  const commande = props.commande
  const avis = props.avis
  const favoris = props.favoris
  const montantDepense = props.montantDepense
  const flash=props

  const [activeTab, setActiveTab] = useState('Moi')
  const [editMode, setEditMode] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const fileInputRef = useRef(null)

  // État pour les données du profil
  const [profileData, setProfileData] = useState({
    nom: user.nom || '',
    email: user.email || '',
    telephone: user.phone || '673917550',
    ville: user.ville || '',
    quartier: user.quartier || '',
    prenom: user.prenom || '',
    avatar: `/storage/${user.image}` || null
  })

  // État pour le changement de mot de passe
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  // Statistiques utilisateur
  const userStats = {
    commandes_total: 23,
    commandes_mois: 5,
    montant_total: 145000,
    favoris: 12,
    avis_donnes: 18,
    membre_depuis: '2023-01-15'
  }

  // Préférences de notification
  const [notifications, setNotifications] = useState({
    email_commandes: true,
    email_promotions: false,
    sms_livraison: true,
    sms_promotions: false,
    push_notifications: true
  })

  // Fonction pour gérer les changements dans le formulaire
  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  // Fonction pour sauvegarder le profil
  // Fonction pour sauvegarder le profil
  const handleSaveProfile = async () => {
    if(!editMode){
      return setEditMode(true);

    }
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const formData = new FormData()
      formData.append('nom', profileData.nom)
      formData.append('prenom', profileData.prenom)
      formData.append('email', profileData.email)
      formData.append('telephone', profileData.telephone)
      formData.append('ville', profileData.ville)
      formData.append('quartier', profileData.quartier)

      // Ajouter le fichier image seulement s’il existe et qu’il est un File
      if (profileData.avatar instanceof File) {
        formData.append('avatar', profileData.avatar)
      }

      await router.post('/profile/update', formData, {
        forceFormData: true, // ⚠️ très important pour Inertia
        onSuccess: () => {
          setSuccessMessage('Profil mis à jour avec succès !')
          setEditMode(false)
        },
        onError: () => {
          setErrorMessage('Erreur lors de la mise à jour du profil')
        }
      })
    } catch (error) {
      console.error('Erreur:', error)
      setErrorMessage('Erreur lors de la mise à jour du profil')
    } finally {
      setIsLoading(false)
    }
  }


  // Fonction pour changer le mot de passe
  const handleChangePassword = async () => {
    if (passwordData.password !== passwordData.password_confirmation) {
      setErrorMessage('Les mots de passe ne correspondent pas')
      return
    }

    if (passwordData.password.length < 8) {
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères')
      return
    }

    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await router.put('/profile/password', passwordData)
      setSuccessMessage('Mot de passe mis à jour avec succès !')
      setShowPasswordForm(false)
      setPasswordData({ current_password: '', password: '', password_confirmation: '' })
    } catch (error) {
      setErrorMessage('Erreur lors du changement de mot de passe')
      console.error('Erreur:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour gérer l'upload d'avatar
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setProfileData(prev => ({ ...prev, avatar: file }))
    }
  }


  // Fonction pour supprimer l'avatar
  const handleRemoveAvatar = () => {
    router.delete('/profile/avatar')
    setProfileData(prev => ({ ...prev, avatar: null }))
  }

  // Fonction pour mettre à jour les préférences de notification
  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  // Fonction pour sauvegarder les notifications
  const handleSaveNotifications = async () => {
    setIsLoading(true)
    try {
      await router.put('/profile/notifications', notifications)
      setSuccessMessage('Préférences de notification mises à jour !')
    } catch (error) {
      setErrorMessage('Erreur lors de la mise à jour des préférences')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <NavBar2 />
      <SideBar2 activeTab={activeTab} setActiveTab={setActiveTab} />
       <AlertMessage message={flash.success} type="success" />
       <AlertMessage message={flash.error} type="error" />

      <div className="mt-20 md:ml-32 min-h-screen bg-gray-50 pb-8">
        <div className="px-6 py-8">
          {/* En-tête du profil */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Photo de profil */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profileData.avatar ? (
                    <img
                      src={profileData.avatar instanceof File ? URL.createObjectURL(profileData.avatar) : `/storage/${user.image}`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-16 h-16 text-gray-400" />
                  )}

                </div>


                <div className="absolute -bottom-2 -right-2 flex space-x-2">
                  {editMode && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                    title="Changer la photo"
                  >
                    <FiCamera className="w-4 h-4" />
                  </button>
                  )}
                  {profileData.avatar && (
                    <button
                      onClick={handleRemoveAvatar}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Supprimer la photo"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>


                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  name="avatar"
                />
              </div>

              {/* Informations utilisateur */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">
                      {profileData.nom} {profileData.prenom}
                    </h1>
                    <p className="text-gray-600 flex items-center">
                      <FiMail className="w-4 h-4 mr-2" />
                      {profileData.email}
                    </p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      {profileData.quartier}, {profileData.ville}
                    </p>
                  </div>

                  <div className="flex space-x-3">

                  </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{commande}</p>
                    <p className="text-sm text-gray-600">Commandes</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{montantDepense}</p>
                    <p className="text-sm text-gray-600">FCFA dépensés</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{favoris}</p>
                    <p className="text-sm text-gray-600">Favoris</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">{avis}</p>
                    <p className="text-sm text-gray-600">Avis donnés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages de feedback */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center">
              <FiCheck className="w-5 h-5 text-green-600 mr-3" />
              <p className="text-green-700">{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center">
              <FiAlertTriangle className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-red-700">{errorMessage}</p>
            </div>
          )}

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Informations personnelles */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiUser className="w-6 h-6 mr-3 text-blue-500" />
                Informations personnelles
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={profileData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={profileData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prenom
                    </label>
                    <input
                      type="text"
                      value={profileData.prenom}
                      onChange={(e) => handleInputChange('prenom', e.target.value)}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={profileData.ville}
                      onChange={(e) => handleInputChange('ville', e.target.value)}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quartier
                    </label>
                    <input
                      type="text"
                      value={profileData.quartier}
                      onChange={(e) => handleInputChange('quartier', e.target.value)}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <button onClick={handleSaveProfile} className='px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-300 transition-colors w-full'>{!editMode?"Activer l'edition":"Enregistrer"}</button>
                </div>
              </div>
            </div>

            {/* Sécurité et Notifications */}
            <div className="space-y-8">

              {/* Sécurité */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FiLock className="w-6 h-6 mr-3 text-red-500" />
                  Sécurité
                </h2>

                {!showPasswordForm ? (
                  <div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">Mot de passe</h3>
                        <p className="text-sm text-gray-600">Dernière modification il y a {''}
                          {formatDistanceToNow(new Date(auth.user.updated_at), { addSuffix: false, locale: fr })}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowPasswordForm(true)}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-300 transition-colors"
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe actuel
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.current_password}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, current_password: e.target.value }))}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.password}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmer le nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordData.password_confirmation}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, password_confirmation: e.target.value }))}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowPasswordForm(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleChangePassword}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                      >
                        {isLoading ? 'Modification...' : 'Modifier mot de passe'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Préférences de notification */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FiSettings className="w-6 h-6 mr-3 text-orange-500" />
                  Notifications
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Notifications par email</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Mises à jour des commandes</span>
                        <input
                          type="checkbox"
                          checked={notifications.email_commandes}
                          onChange={(e) => handleNotificationChange('email_commandes', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Promotions et offres spéciales</span>
                        <input
                          type="checkbox"
                          checked={notifications.email_promotions}
                          onChange={(e) => handleNotificationChange('email_promotions', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Notifications SMS</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Statut de livraison</span>
                        <input
                          type="checkbox"
                          checked={notifications.sms_livraison}
                          onChange={(e) => handleNotificationChange('sms_livraison', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Offres promotionnelles</span>
                        <input
                          type="checkbox"
                          checked={notifications.sms_promotions}
                          onChange={(e) => handleNotificationChange('sms_promotions', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Notifications push</span>
                      <input
                        type="checkbox"
                        checked={notifications.push_notifications}
                        onChange={(e) => handleNotificationChange('push_notifications', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </label>
                  </div>

                  <button
                    onClick={handleSaveNotifications}
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orage-300 disabled:opacity-50 transition-colors"
                  >
                    {isLoading ? 'Sauvegarde...' : 'Sauvegarder les préférences'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}