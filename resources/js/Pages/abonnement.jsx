import AdminNavBar from '@/Layouts/AdminNavBar'
import AlertMessage from '@/Layouts/AlertMessage'
import { router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import {
  FiDollarSign, FiList, FiSearch, FiCheckCircle, FiClock,
  FiXCircle, FiLayers, FiFileText, FiSettings, FiEye, FiEdit,
  FiTrash, FiChevronLeft, FiPlus
} from 'react-icons/fi'

const Abonnement = () => {
  const [active, setActive] = useState("payments")
  const [view, setView] = useState("list") // "list" | "vendeur" | "form"
  const [action, setAction] = useState('')
  const [formData, setFormData] = useState({
    type: '',
    moyen: '',
    prix: '',
    duree: '',
    description: ''
  })

  const supprimer = (id) => {
    if (confirm("voulez-vous supprimer ce forfait?")) {
      router.delete(`/admin/removeForfait/${id}`)
    }
  }
  const redirigerVers = (lien) => {
    return lien
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    action == "add" ?
      router.post('/add/forfait', formData) : router.post('/admin/updateForfait', formData)
    setView('list')

  }

  // Exemple de données mockées (à remplacer par ton fetch Laravel plus tard)
  const paiements = [
    { id: 1, vendeur: "Boutique Alpha", email: "alpha@gmail.com", montant: "10 000 FCFA", type: "Mensuel", statut: "Payé", date: "25-08-2025" },
    { id: 2, vendeur: "Boutique Beta", email: "beta@gmail.com", montant: "25 000 FCFA", type: "Annuel", statut: "En attente", date: "20-08-2025" },
    { id: 3, vendeur: "Boutique Gamma", email: "gamma@gmail.com", montant: "10 000 FCFA", type: "Mensuel", statut: "Expiré", date: "01-07-2025" },
  ]
  const { props } = usePage()
  const { flash } = props

  const abonnements = props.abonnement
  const forfait = props.forfait
  const today = new Date()
  const abPaye = abonnements.filter((abonnement) => abonnement.statut == 'actif').length
  const abExpire = abonnements.filter(abonnement => new Date(abonnement.date_fin) < today).length
  const [selectedForfait, setSelectedForfait] = useState(null);





  return (
    <div className=''>
      <AdminNavBar active={active} setActive={setActive} />
      <AlertMessage message={flash.success} type="success" />
      <AlertMessage message={flash.error} type="error" />
      <div className="p-6 bg-white rounded-lg shadow-md md:ml-60">
        {/* Header */}
        {view === "list" && (
          <div className='mb-6 mt-11 md:mt-0'>
            <h2 className="text-2xl font-bold flex items-center mb-1 bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-200 bg-clip-text text-transparent ">
              <span className='inline-block bg-yellow-300 p-2 rounded mr-4 text-white'>
                <FiDollarSign />
              </span>
              <p className='flex flex-col'>
                <span>Gestion des Abonnements et paiements</span>
                <span className='text-xs text-black'>Gérez efficacement les abonnements, commissions et paiements ici</span>
              </p>
            </h2>

            {/* Recherche */}
            <div className='flex md:block gap-3'>
              <div className='flex items-center border w-max px-3 rounded-md'>
                <FiSearch className='text-gray-400' />
                <input
                  type="search"
                  placeholder="Rechercher par vendeur, email ou type"
                  className="h-8 px-3 text-xs bg-white rounded-md border-none outline-none"
                />
              </div>
              <button className='bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 text-white px-2 rounded-md md:mt-2 text-sm py-1'>
                Valider
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        {view === "list" && (
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
              <div className='bg-black text-white p-2 rounded'>
                <FiList />
              </div>
              <p className='flex flex-col'>
                <span className='text-sm'>Total forfait</span>
                <span className='font-bold'>{forfait.length}</span>
              </p>
            </div>
            <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
              <div className='bg-yellow-400 text-white p-2 rounded'>
                <FiClock />
              </div>
              <p className='flex flex-col'>
                <span className='text-sm'>Total abonnement</span>
                <span className='font-bold'>{abonnements.length}</span>
              </p>
            </div>
            <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
              <div className='bg-green-500 text-white p-2 rounded'>
                <FiCheckCircle />
              </div>
              <p className='flex flex-col'>
                <span className='text-sm'>Payés</span>
                <span className='font-bold'>{abPaye}</span>
              </p>
            </div>

            <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
              <div className='bg-red-500 text-white p-2 rounded'>
                <FiXCircle />
              </div>
              <p className='flex flex-col'>
                <span className='text-sm'>Expirés</span>
                <span className='font-bold'>{abExpire}</span>
              </p>
            </div>
          </div>
        )}

        {/* Tableau des abonnements */}
        {view === "list" && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold"><FiLayers className="inline mr-2 text-blue-500" />Type</th>
                  <th className="px-4 py-3 text-left font-semibold"><FiFileText className="inline mr-2 text-green-500" />Description</th>
                  <th className="px-4 py-3 text-left font-semibold"><FiDollarSign className="inline mr-2 text-orange-500" />Montant</th>
                  <th className="px-4 py-3 text-left font-semibold"><FiClock className="inline mr-2 text-purple-500" />Durée</th>
                  <th className="px-4 py-3 text-left font-semibold"><FiSettings className="inline mr-2 text-red-500" />Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {forfait.map((ab, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200 even:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-blue-700 text-base">
                      <p>{ab.nom}</p>
                      <p className='text-[10px] px-2 bg-gray-300 text-black rounded'>{ab.abonnements ? (ab.abonnements).length : '0'} abonnements</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{ab.description}</td>
                    <td className="px-4 py-3 font-semibold text-orange-600">
                      {ab.nom !== "commission" ? `${ab.prix.toLocaleString()} FCFA` : parseInt(ab.prix) + "%"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{ab.duree}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 relative z-10">
                        <button
                          onClick={() => {
                            setSelectedForfait(ab);
                            setView("vendeur");
                          }}
                          className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-600"
                        >
                          <FiEye />
                        </button>
                        <button
                          onClick={() => {
                            setView("form");
                            setFormData({
                              id: ab.id,
                              type: ab.nom,
                              moyen: ab.pourcentage ? 'pourcentage' : 'monnaie',
                              prix: ab.prix,
                              duree: ab.duree,
                              description: ab.description
                            });
                            setAction('modifier');
                          }}
                          className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-full text-yellow-600"><FiEdit /></button>
                        <button onClick={() => supprimer(ab.id)} className="p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600" ><FiTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tableau vendeurs */}
        {view === "vendeur" && (
          <div className="overflow-x-auto">
            <div className='text-end mb-6'>
              <button onClick={() => setView("list")} className='rounded px-2 bg-red-300 '>
                <p className='flex items-center'><FiChevronLeft className='mr-4' />Retour</p>
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">
              Vendeurs abonnés au forfait : {selectedForfait.nom}
            </h2>
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border">Vendeur</th>
                  <th className="px-4 py-2 text-left border">Email</th>
                  <th className="px-4 py-2 text-left border">Montant</th>
                  <th className="px-4 py-2 text-left border">Type</th>
                  <th className="px-4 py-2 text-left border">Statut</th>
                  <th className="px-4 py-2 text-left border">Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedForfait && selectedForfait.abonnements && selectedForfait.abonnements.map((ab, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{ab.user.nom}</td>
                    <td className="px-4 py-2 border">{ab.user.email}</td>
                    <td className="px-4 py-2 border font-bold">{selectedForfait.pourcentage == 1 ? selectedForfait.prix + "%" : selectedForfait.prix + "FCFA"} </td>
                    <td className="px-4 py-2 border">{selectedForfait.nom}</td>
                    <td className={`px-4 py-2 border font-semibold ${ab.statut === "actif" ? "text-green-600" : "text-red-600"}`}>
                      {ab.statut}
                    </td>
                    <td className="px-4 py-2 border">{ab.date_debut}-{ab.date_fin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Formulaire */}
        {view === "form" && (
          <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4 flex items-center text-orange-600"><FiPlus className="mr-2" /> Ajouter / Modifier un abonnement</h3>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Type d'abonnement */}
              {action == 'modifier' && <input className='hidden' name='id' value={formData.id} />}
              <div>
                <label className="block mb-1 font-medium">Type d'abonnement</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>

              {/* Moyen */}
              <div>
                <label className="block mb-1 font-medium">Moyen</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="moyen"
                      value="pourcentage"
                      checked={formData.moyen === "pourcentage"}
                      onChange={handleChange}
                    />
                    Pourcentage
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="moyen"
                      value="monnaie"
                      checked={formData.moyen === "monnaie"}
                      onChange={handleChange}
                    />
                    Monnaie
                  </label>
                </div>
              </div>

              {/* Montant */}
              <div>
                <label className="block mb-1 font-medium">Montant</label>
                <input
                  type="number"
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>

              {/* Durée */}
              <div>
                <label className="block mb-1 font-medium">Durée</label>
                <select
                  name="duree"
                  value={formData.duree}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                >
                  <option value="">-- Choisir --</option>
                  <option value="1 mois">1 mois</option>
                  <option value="3 mois">3 mois</option>
                  <option value="1 an">1 an</option>
                  <option value="illimite">Illimité</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                  rows="3"
                  placeholder="Écrivez une description..."
                />
              </div>

              {/* Boutons */}
              <div className="flex gap-4 mt-3">
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
                  Enregistrer
                </button>
                <button type="button" onClick={() => (setView("list"), setFormData({
                  type: '',
                  moyen: '',
                  prix: '',
                  duree: '',
                  description: ''
                }))}
                  className="bg-gray-300 px-4 py-2 rounded">
                  Annuler
                </button>
              </div>
            </form>

          </div>
        )
        }

        {/* Bouton flottant */}
        {
          view === "list" && (
            <div className='right-0 md:top-10 bottom-10 fixed'>
              <button onClick={() => (
                setView("form"),
                setAction("add"))
              } className='px-3 border py-1 text-white bg-orange-500 rounded shadow-orange-600 shadow-lg'>
                <p className='flex items-center'><FiPlus className='mr-2' />Ajouter un type</p>
              </button>
            </div>
          )
        }

      </div >
    </div >
  )
}

export default Abonnement
