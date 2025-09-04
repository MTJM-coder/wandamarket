import AdminNavBar from '@/Layouts/AdminNavBar'
import React, { useState } from 'react'
import { FiMail, FiPhone, FiPlus, FiShield ,FiUser,FiCalendar,FiSettings,FiMapPin,FiTrash2} from 'react-icons/fi'
import { FaUserShield,FaUserTie,FaCrown } from 'react-icons/fa'

const Admin = () => {
  const [active, setActive] = useState("admin")
  const [isOpen, setIsOpen] = useState(false) // modal open/close
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    password: "",
    role: "admin"
  })

  const admin = [
    {
      id: 1,
      nom: "adminJaudel",
      email: "admin@gmail.com",
      telephone: "456748940",
      created_at: "2020/04/03",
      updated_at: "2020/03/01",
      role: 'admin'
    }
  ]

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Admin ajouté :", formData)
    setIsOpen(false)
    setFormData({
      nom: "",
      email: "",
      telephone: "",
      password: "",
      role: "admin"
    })
  }

  return (
    <div>
      <AdminNavBar active={active} setActive={setActive} />
      <div className="p-6 bg-white rounded-lg shadow-md md:ml-60">
                <div className='mb-6 mt-11 md:mt-0 justify-between flex'>
                    <h2 className="text-2xl font-bold flex items-center mb-1 bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-200 bg-clip-text text-transparent "><span className='inline-block bg-yellow-300 p-2 rounded mr-4 text-white'><FaUserShield className='' /></span> <p className='flex flex-col'> <span>Gestion des Administrateurs</span> <span className='text-xs text-black'>Gerer efficacement vos administrateurs ici</span></p></h2>
                    <button onClick={()=>setIsOpen(true)} className='rounded-md bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 text-white px-4 h-10 font-bold' ><p className='flex items-center gap-3'><FiPlus/>Add</p> </button>
                </div>

                <div className='flex mb-6 gap-5'>
                    <div className='bg-white flex items-center gap-5 shadow-md p-5 rounded'>
                        <div className='bg-green-700 p-3 rounded text-white'><FaUserTie /></div>
                        <div className='flex flex-col'>
                            <span className='text-sm'>Total admin</span>
                            <span className='font-bold'>{admin.length}</span>

                        </div>

                    </div>
                    <div className='bg-white flex items-center gap-5 shadow-md p-5 rounded'>
                        <div className='bg-gradient-to-r from-red-600 via-red-500 to-red-400 p-3 rounded text-white'><FaCrown /></div>
                        <div className='flex flex-col'>
                            <span className='text-sm'>Super Admin</span>
                            <span className='font-bold'>3</span>

                        </div>

                    </div>

                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-x-2 border-collapse border border-gray-200 overflow-auto">
                        <thead>
                            <tr className="bg-gray-100 md:text-inherit text-xs">
                                <th className="tracking-wider px-2 py-4 text-left  items-center">
                                    <FiUser className="inline mr-2 text-blue-300" />Details Admin
                                </th>
                                <th className="tracking-wider px-2 py-4 text-left items-center">
                                    <FiMail className="inline mr-2 text-green-300" />Contact infos
                                </th>
                                <th className="tracking-wider px-2 py-4 text-left items-center">
                                    <FiShield className="inline mr-2 text-green-300" />role
                                </th>
                                <th className="tracking-wider px-2 py-4 text-left  items-center">
                                    <FiCalendar className="inline mr-2 text-orange-300" />Date
                                </th>
                                <th className="tracking-wider px-2 py-4 text-left  items-center">
                                    <FiSettings className="inline mr-2 text-purple-300" />Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {admin.map((client) =>
                                <tr>
                                    <td className="px-2 py-4 text-left">
                                        <p className="font-bold md:text-xl ">{client.nom}</p>
                                        <p className="text-xs p-2 border w-max m-2 rounded bg-gray-100">ID:{client.id}</p>
                                    </td>
                                    <td className="text-xs text-gray-600 space-y-2 font-semibold px-2 py-4 text-left">
                                        <p>
                                            <FiMail className="inline" /> <span>{client.email}</span>
                                        </p>
                                        <p>
                                            <FiPhone className="inline" /> <span>{client.telephone}</span>
                                        </p>
                                        <p>
                                            <FiMapPin className="inline" /> <span>{client.ville}, {client.quartier}</span>
                                        </p>
                                    </td>
                                    <td className="space-y-1 px-2 py-4 text-left">
                                        <p className={`text-sm px-5  rounded w-max ${client.role == "super admin" ? "bg-red-200 text-red-700" : "bg-green-300 text-green-700"} `}>{client.role}</p>
                                    </td>
                                    <td className="space-y-1 px-2 py-4 text-left">
                                        <p className="text-xs">
                                            <span className="font-bold">Inscris: </span><span>{client.created_at}</span>
                                        </p>
                                        <p className="text-xs">
                                            <span className="font-bold">Modifié: </span><span>{client.updated_at}</span>
                                        </p>
                                    </td>
                                    <td className="px-2 py-4 text-left">
                                        <div className="flex gap-3 md:gap-5">
                                            {client.etat == "actif" ? (
                                                <FiShieldOff className="hover:text-orange-500 cursor-pointer" />
                                            ) :
                                                <FiShield className="hover:text-orange-500 cursor-pointer" />
                                            }
                                            <FiTrash2 className="hover:text-red-500 cursor-pointer" />

                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>


           
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-600">Ajouter un Administrateur</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold">Nom complet</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-yellow-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-yellow-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Téléphone</label>
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-yellow-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-yellow-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Rôle</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-yellow-300"
                  >
                    <option value="admin">Admin</option>
                    <option value="super admin">Super Admin</option>
                  </select>
                </div>

                {/* boutons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-yellow-500 text-white font-bold hover:bg-yellow-600"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin


