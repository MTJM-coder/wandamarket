import React, { useState } from 'react'
import { FiEye } from 'react-icons/fi'
import NavBar3 from '@/Layouts/NavBar3'
import SellerSideBar from '@/Layouts/SellerSideBar'

const SellerClient = ({clienList}) => {
  const [activeTab,setActiveTab]=useState("clients")
  const clients=[
    {
      id:1,
      nom:"lorene",
      email:"loren@gmail.com",
      phone:"45875734",
      ordersCount:30,
      totalSpent:"20000",
      lastOrderDate:"2022/03/03"
    }
  ]
  return (
    <div>
       <NavBar3 activeTab={activeTab} setActiveTab={setActiveTab} />
      <SellerSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="md:p-4 mt-10 md:ml-20">
            <div className="p-4 md:p-6">

              <div className="overflow-x-auto bg-white shadow rounded">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold">
                      <th className="p-3">Nom</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Téléphone</th>
                      <th className="p-3 text-center">Commandes</th>
                      <th className="p-3 text-right">Total Dépensé</th>
                      <th className="p-3 text-center">Dernière commande</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr
                        key={index}
                        className="border-b hover:bg-gray-50 transition text-sm"
                      >
                        <td className="p-3">{client.nom}</td>
                        <td className="p-3">{client.email}</td>
                        <td className="p-3">{client.phone}</td>
                        <td className="p-3 text-center">{client.ordersCount}</td>
                        <td className="p-3 text-right font-semibold text-green-600">
                          {client.totalSpent.toLocaleString()} FCFA
                        </td>
                        <td className="p-3 text-center">{client.lastOrderDate}</td>
                        <td className="p-3 text-center">
                          <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded-lg hover:bg-orange-700 transition">
                            <FiEye className='inline mr-4' /> Voir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </div>
  )
}

export default SellerClient