import React from 'react'

const SellerProfil = () => {
  return (
    <div>
         <div className="p-6">
            <h2 className="text-xl font-bold text-[#071726] mb-6">Paramètres de la boutique</h2>
            <form className="space-y-6" onClick={handleUpdateBoutique(boutique.id)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la boutique *</label>
                  <input
                    type="text"
                    defaultValue={boutique.nom}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                  <input
                    type="text"
                    defaultValue={boutique.ville}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quartier *</label>
                  <input
                    type="text"
                    defaultValue={boutique.quartier}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <input
                    type="tel"
                    defaultValue={boutique.telephone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email de contact *</label>
                  <input
                    type="email"
                    defaultValue={boutique.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
                  <input
                    type="url"
                    defaultValue={boutique.site_web}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  rows={4}
                  defaultValue={boutique.description}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo de la boutique</label>
                <div className="mt-1 flex items-center">
                  <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                    {boutique.logo ? (
                      <img src={boutique.logo} alt="Logo boutique" className="h-full w-full object-cover" />
                    ) : (
                      <FaStore className="h-full w-full text-gray-400 p-4" />
                    )}
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-[#071726] hover:bg-gray-50 transition mr-3"
                  >
                    Changer le logo
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#ec8d0c] text-white rounded-lg hover:bg-[#d97d0c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c]"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
    </div>
  )
}

export default SellerProfil