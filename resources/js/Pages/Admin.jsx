import AdminNavBar from '@/Layouts/AdminNavBar'
import React, { useState } from 'react'
import { FiMail, FiPhone, FiPlus, FiShield, FiUser, FiCalendar, FiSettings, FiMapPin, FiTrash2, FiShieldOff } from 'react-icons/fi'
import { FaUserShield, FaUserTie, FaCrown } from 'react-icons/fa'
import { router, usePage } from '@inertiajs/react'
import AlertMessage from '@/Layouts/AlertMessage'

const Admin = () => {

  const [active, setActive] = useState("admin")
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    search: "",
    id: null,
    role: "admin",
  });
  const { props } = usePage()
  const { flash } = props
  const admins = props.admins
  const user = props.user
  const totalAdmin = admins.filter(admin => admin.role == 'admin').length
  const totalSuperAdmin = admins.filter(admin => admin.role == "super_admin").length
  const supprimer = (id) => {
    if (confirm("voulez-vous supprimer cet administrateur?")) {
      return window.location.href = '/remove/admin/' + id
    }

  }
  const disblock = (id) => {
    return window.location.href = '/disblock/admin/' + id
  }




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectUser = (selectedUser) => {
    setFormData({
      ...formData,
      search: selectedUser.nom,
      id: selectedUser.id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.id) {
      alert("Veuillez sélectionner un utilisateur !");
      return;
    }

    setIsOpen(false);

    router.post('/add/admin', {
      id: formData.id,
      role: formData.role
    });
  };

  return (
    <div>
      <AdminNavBar active={active} setActive={setActive} />
      <AlertMessage message={flash.success} type="success" />
      <AlertMessage message={flash.error} type="error" />

      <div className="p-6 bg-white rounded-lg shadow-md md:ml-60">
        <div className='mb-6 mt-11 md:mt-0 justify-between flex'>
          <h2 className="text-2xl font-bold flex items-center mb-1 bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-200 bg-clip-text text-transparent "><span className='inline-block bg-yellow-300 p-2 rounded mr-4 text-white'><FaUserShield className='' /></span> <p className='flex flex-col'> <span>Gestion des Administrateurs</span> <span className='text-xs text-black'>Gerer efficacement vos administrateurs ici</span></p></h2>
          <button onClick={() => setIsOpen(true)} className='rounded-md bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 text-white px-4 h-10 font-bold' ><p className='flex items-center gap-3'><FiPlus />Add</p> </button>
        </div>

        <div className='flex mb-6 gap-5'>
          <div className='bg-white flex items-center gap-5 shadow-md p-5 rounded'>
            <div className='bg-green-700 p-3 rounded text-white'><FaUserTie /></div>
            <div className='flex flex-col'>
              <span className='text-sm'>Total admin</span>
              <span className='font-bold'>{totalAdmin}</span>

            </div>

          </div>
          <div className='bg-white flex items-center gap-5 shadow-md p-5 rounded'>
            <div className='bg-gradient-to-r from-red-600 via-red-500 to-red-400 p-3 rounded text-white'><FaCrown /></div>
            <div className='flex flex-col'>
              <span className='text-sm'>Super Admin</span>
              <span className='font-bold'>{totalSuperAdmin}</span>

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
              {admins.map((admin) =>
                <tr>
                  <td className="px-2 py-4 text-left">
                    <p className="font-bold md:text-xl ">{admin.nom}</p>
                    <p className="text-xs p-2 border w-max m-2 rounded bg-gray-100">ID:{admin.id}</p>
                  </td>
                  <td className="text-xs text-gray-600 space-y-2 font-semibold px-2 py-4 text-left">
                    <p>
                      <FiMail className="inline" /> <span>{admin.email}</span>
                    </p>
                    {admin.telephone && (
                      <p>
                        <FiPhone className="inline" /> <span>{admin.telephone}</span>
                      </p>
                    )}
                    {admin.ville && (
                      <p>
                        <FiMapPin className="inline" /> <span>{admin.ville}, {admin.quartier}</span>
                      </p>
                    )}
                  </td>
                  <td className="space-y-1 px-2 py-4 text-left">
                    <p className={`text-sm px-5  rounded w-max ${admin.role == "super_admin" ? "bg-red-200 text-red-700" : "bg-green-300 text-green-700"} `}>{admin.role}</p>
                  </td>
                  <td className="space-y-1 px-2 py-4 text-left">
                    <p className="text-xs">
                      <span className="font-bold">Inscris: </span><span>{new Date(admin.created_at).toDateString()}</span>
                    </p>
                    <p className="text-xs">
                      <span className="font-bold">Modifié: </span><span>{new Date(admin.updated_at).toDateString()}</span>
                    </p>
                  </td>
                  <td className="px-2 py-4 text-left">
                    <div className="flex gap-3 md:gap-5">
                      {admin.statut == "actif" ? (
                        <FiShieldOff className="hover:text-orange-500 cursor-pointer" onClick={() => disblock(admin.id)} />
                      ) :
                        <FiShield className="hover:text-orange-500 cursor-pointer" onClick={() => disblock(admin.id)} />
                      }
                      <FiTrash2 className="hover:text-red-500 cursor-pointer" onClick={() => supprimer(admin.id)} />

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
              <form onSubmit={handleSubmit} method='post' className="space-y-4">
                {/* <div>
                  <label className="block text-sm font-semibold">entrer l'email de l'utilisateur</label>
                  <input
                    type="search"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-yellow-300"
                    required
                  />
                </div> */}
                <div className="relative">
                  <label className="block text-sm font-semibold">Utilisateur</label>
                  <input
                    type="text"
                    name="search"
                    value={formData.search}
                    onChange={handleChange}
                    placeholder="Rechercher par nom"
                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-yellow-300"
                  />

                  {/* Suggestions */}
                  {formData.search.length > 0 && (
                    <ul className="absolute z-50 bg-white border w-full mt-1 rounded shadow max-h-40 overflow-y-auto">
                      {user
                        .filter(u =>
                          u.nom.toLowerCase().startsWith(formData.search.toLowerCase()) // filtre sur le nom
                        )
                        .map(u => (
                          <li
                            key={u.id}
                            onClick={() => handleSelectUser(u)}
                            className="px-3 py-2 cursor-pointer hover:bg-yellow-100"
                          >
                            {u.nom} - <span className="text-xs text-gray-500">{u.email}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                {formData.id && (
                  <div className="mt-4 p-3 border rounded bg-gray-50">
                    <p><strong>Email :</strong> {user.find(u => u.id === formData.id)?.email}</p>
                    <p><strong>Téléphone :</strong> {user.find(u => u.id === formData.id)?.telephone}</p>
                    <p><strong>Ville :</strong> {user.find(u => u.id === formData.id)?.ville}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold">Rôle</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-yellow-300"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
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


