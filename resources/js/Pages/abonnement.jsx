import AdminNavBar from '@/Layouts/AdminNavBar'
import React, { useState } from 'react'
import { 
  FiDollarSign, FiList, FiSearch, FiCheckCircle, FiClock, 
  FiXCircle, FiLayers, FiFileText, FiSettings, FiEye, FiEdit, 
  FiTrash, FiChevronLeft, FiPlus 
} from 'react-icons/fi'

const Abonnement = () => {
  const [active, setActive] = useState("payments")
  const [view, setView] = useState("list") // "list" | "vendeur" | "form"

  // Exemple de données mockées (à remplacer par ton fetch Laravel plus tard)
  const paiements = [
    { id: 1, vendeur: "Boutique Alpha", email: "alpha@gmail.com", montant: "10 000 FCFA", type: "Mensuel", statut: "Payé", date: "25-08-2025" },
    { id: 2, vendeur: "Boutique Beta", email: "beta@gmail.com", montant: "25 000 FCFA", type: "Annuel", statut: "En attente", date: "20-08-2025" },
    { id: 3, vendeur: "Boutique Gamma", email: "gamma@gmail.com", montant: "10 000 FCFA", type: "Mensuel", statut: "Expiré", date: "01-07-2025" },
  ]

  const abonnements = [
    { type: "commission", description: "un pourcentage sur le prix total de chaque commande effectué", montant: "1%", duree: "illimité" },
    { type: "Basique", description: "Permet de publier jusqu’à 10 produits sur la plateforme", montant: 5000, duree: "1 mois" },
    { type: "Standard", description: "Publiez jusqu’à 50 produits et bénéficiez d’une meilleure visibilité", montant: 15000, duree: "3 mois" },
    { type: "Premium", description: "Publiez un nombre illimité de produits et obtenez une mise en avant", montant: 30000, duree: "6 mois" },
    { type: "Entreprise", description: "Pour les grandes boutiques avec des avantages personnalisés", montant: 50000, duree: "12 mois" },
  ]

  return (
    <div>
      <AdminNavBar active={active} setActive={setActive} />

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
                <span className='text-sm'>Total abonnements</span>
                <span className='font-bold'>3</span>
              </p>
            </div>
            <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
              <div className='bg-green-500 text-white p-2 rounded'>
                <FiCheckCircle />
              </div>
              <p className='flex flex-col'>
                <span className='text-sm'>Payés</span>
                <span className='font-bold'>1</span>
              </p>
            </div>
            <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
              <div className='bg-yellow-400 text-white p-2 rounded'>
                <FiClock />
              </div>
              <p className='flex flex-col'>
                <span className='text-sm'>En attente</span>
                <span className='font-bold'>1</span>
              </p>
            </div>
            <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
              <div className='bg-red-500 text-white p-2 rounded'>
                <FiXCircle />
              </div>
              <p className='flex flex-col'>
                <span className='text-sm'>Expirés</span>
                <span className='font-bold'>1</span>
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
                {abonnements.map((ab, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200 even:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-blue-700 text-base">
                      <p>{ab.type}</p>
                      <p className='text-[10px] px-2 bg-gray-300 text-black rounded'>23 vendeurs</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{ab.description}</td>
                    <td className="px-4 py-3 font-semibold text-orange-600">
                      {ab.type !== "commission" ? `${ab.montant.toLocaleString()} FCFA` : ab.montant}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{ab.duree}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setView("vendeur")} className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-600"><FiEye /></button>
                        <button onClick={() => setView("form")} className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-full text-yellow-600"><FiEdit /></button>
                        <button className="p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600"><FiTrash /></button>
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
                {paiements.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{p.vendeur}</td>
                    <td className="px-4 py-2 border">{p.email}</td>
                    <td className="px-4 py-2 border font-bold">{p.montant}</td>
                    <td className="px-4 py-2 border">{p.type}</td>
                    <td className={`px-4 py-2 border font-semibold ${
                      p.statut === "Payé" ? "text-green-600" :
                      p.statut === "En attente" ? "text-yellow-600" : "text-red-600"
                    }`}>
                      {p.statut}
                    </td>
                    <td className="px-4 py-2 border">{p.date}</td>
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
            <form className="flex flex-col gap-5">
              <div>
                <label className="block mb-1 font-medium">Type d'abonnement</label>
                <input type="text" className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Moyen</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2"><input type="radio" name="moyen" /> Pourcentage</label>
                  <label className="flex items-center gap-2"><input type="radio" name="moyen" /> Monnaie</label>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Montant</label>
                <input type="number" className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Durée</label>
                <select className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none">
                  <option>1 mois</option>
                  <option>3 mois</option>
                  <option>6 mois</option>
                  <option>1 an</option>
                  <option>Illimité</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none" rows="3" placeholder="Écrivez une description..." />
              </div>

              <div className="flex gap-4 mt-3">
                <button className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">Enregistrer</button>
                <button type="button" onClick={() => setView("list")} className="bg-gray-300 px-4 py-2 rounded">Annuler</button>
              </div>
            </form>
          </div>
        )}

        {/* Bouton flottant */}
        {view === "list" && (
          <div className='right-0 md:top-10 bottom-10 fixed'>
            <button onClick={() => setView("form")} className='px-3 border py-1 text-white bg-orange-500 rounded shadow-orange-600 shadow-lg'>
              <p className='flex items-center'><FiPlus className='mr-2' />Ajouter un type</p>
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Abonnement
