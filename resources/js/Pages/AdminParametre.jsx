import React, { useState } from 'react'
import AdminNavBar from '@/Layouts/AdminNavBar'
import { FiUser, FiLock, FiBell, FiDollarSign, FiSettings } from 'react-icons/fi'
import { router, usePage } from '@inertiajs/react'
import ConfirmPassword from './Auth/ConfirmPassword'
import AlertMessage from '@/Layouts/AlertMessage'

const AdminParametre = () => {
  const [active, setActive] = useState("settings")
  const [onglet, setOnglet] = useState("profil")

  const { admin } = usePage().props
  const {errors}=usePage().props
  const {flash}=usePage().props

  const [formData, setFormData] = useState({
    nom: admin.nom || '',
    email: admin.email || '',
    telephone: admin.telephone || '',
  })

  const [formSecureData,setFormSecureData]=useState({
    passwordActuel:'',
    newPassword_confirmation:'',
    newPassword:''
  })

  // Mise à jour des champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSecureChange = (e) => {
  const { name, value } = e.target;
  setFormSecureData({
    ...formSecureData,
    [name]: value,
  });
};

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    router.post('/admin/update', formData)
  }
  const handleSecuritySubmit=(e)=>{
    e.preventDefault()
    router.post('/admin/update/secure',formSecureData)
  }


  return (
    <div>
      <AdminNavBar active={active} setActive={setActive} />
      <AlertMessage message={flash.success} type="success" />
      <div className="p-6 bg-white rounded-lg shadow-md md:ml-60">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
          <FiSettings className="text-yellow-600" /> Paramètres
        </h2>

        {/* Onglets */}
        <div className="flex gap-4 border-b mb-6">
          <button 
            className={`pb-2 ${onglet === "profil" ? "border-b-2 border-yellow-500 font-bold text-yellow-700" : "text-gray-600"}`}
            onClick={() => setOnglet("profil")}
          >
            <FiUser className="inline mr-1" /> Profil
          </button>
          <button 
            className={`pb-2 ${onglet === "securite" ? "border-b-2 border-yellow-500 font-bold text-yellow-700" : "text-gray-600"}`}
            onClick={() => setOnglet("securite")}
          >
            <FiLock className="inline mr-1" /> Sécurité
          </button>
          <button 
            className={`pb-2 ${onglet === "paiements" ? "border-b-2 border-yellow-500 font-bold text-yellow-700" : "text-gray-600"}`}
            onClick={() => setOnglet("paiements")}
          >
            <FiDollarSign className="inline mr-1" /> Paiements
          </button>
          <button 
            className={`pb-2 ${onglet === "notifications" ? "border-b-2 border-yellow-500 font-bold text-yellow-700" : "text-gray-600"}`}
            onClick={() => setOnglet("notifications")}
          >
            <FiBell className="inline mr-1" /> Notifications
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="mt-4">
          {onglet === "profil" && (
            <div>
              <h3 className="text-lg font-bold mb-3">Modifier votre profil</h3>
              <form className="grid gap-4 max-w-lg" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="nom" 
                  value={formData.nom} 
                  onChange={handleChange} 
                  className="border p-2 rounded w-full" 
                  placeholder="Nom complet"
                />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="border p-2 rounded w-full" 
                  placeholder="Adresse email"
                />
                <input 
                  type="text" 
                  name="telephone" 
                  value={formData.telephone} 
                  onChange={handleChange} 
                  className="border p-2 rounded w-full" 
                  placeholder="Téléphone"
                />
                <button type='submit' className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                  Enregistrer
                </button>
              </form>
            </div>
          )}

          {onglet === "securite" && (
            <div>
              <h3 className="text-lg font-bold mb-3">Sécurité du compte</h3>
              <form className="grid gap-4 max-w-lg" onSubmit={handleSecuritySubmit}  >
                <input type="password" name='passwordActuel' onChange={handleSecureChange} value={formSecureData.passwordActuel} placeholder="Mot de passe actuel" className="border p-2 rounded w-full" />
                <input type="password" name='newPassword' onChange={handleSecureChange} value={formSecureData.newPassword} placeholder="Nouveau mot de passe" className="border p-2 rounded w-full" />
              <input type="password"  name='newPassword_confirmation' onChange={handleSecureChange} value={formSecureData.newPassword_confirmation} placeholder="Confirmer le mot de passe" className="border p-2 rounded w-full" />
              {errors.newPassword && (
  <p className="text-red-500 text-sm">{errors.newPassword}</p>
)}
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Modifier</button>
              </form>
            </div>
          )}

          {onglet === "paiements" && (
            <div>
              <h3 className="text-lg font-bold mb-3">Paramètres de paiement</h3>
              <p className="text-sm text-gray-600 mb-4">Gérez vos moyens de paiement pour les abonnements et commissions.</p>
              <div className="flex flex-col gap-3">
                <div className="p-4 border rounded-md">
                  <p className="font-bold">Mobile Money (MTN / Orange)</p>
                  <p className="text-sm text-gray-600">Configurer votre numéro pour recevoir les paiements.</p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="font-bold">Carte Bancaire</p>
                  <p className="text-sm text-gray-600">Associer une carte pour les paiements automatiques.</p>
                </div>
              </div>
            </div>
          )}

          {onglet === "notifications" && (
            <div>
              <h3 className="text-lg font-bold mb-3">Notifications</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked /> Notifications par email
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Notifications par SMS
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked /> Alertes paiements et abonnements
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminParametre
