import AdminNavBar from '@/Layouts/AdminNavBar'
import React, { useState } from 'react'
import { FaTicketAlt, FaUserTie } from 'react-icons/fa'
import { FiBox, FiSearch, FiUser, FiSettings, FiDollarSign, FiShoppingCart, FiGrid, FiEdit, FiTrash2 } from 'react-icons/fi'
import { MdCategory } from "react-icons/md";


const AdminProduct = () => {
    const [active, setActive] = useState("products")
    return (
        <div>
            <AdminNavBar active={active} setActive={setActive} />
            <div className="p-6 bg-white rounded-lg md:ml-60">
                <div className='mb-6 mt-11 md:mt-0'>
                    <h2 className="text-2xl font-bold flex items-center mb-1 bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-200 bg-clip-text text-transparent ">
                        <span className='inline-block bg-yellow-300 p-2 rounded mr-4 text-white'>
                            <FiBox />
                        </span>
                        <p className='flex flex-col'>
                            <span>Gestion des Produits</span>
                            <span className='text-xs text-black'>Gerer efficacement les acticles ici</span>
                        </p>
                    </h2>

                    <div className='flex flex-col md:flex-row gap-3'>
                        <div className='flex w-full md:w-auto justify-between'>
                            <div className='flex items-center border w-full md:w-max px-3 rounded-md'>
                                <FiSearch className='text-gray-400' />
                                <input
                                    type="search"
                                    placeholder="nom du produit"
                                    className="h-8 px-3 text-xs bg-white rounded-md border-none w-full"
                                />
                            </div>
                            <select
                                className='rounded border border-gray-300 text-gray-600 ml-2 text-xs'
                            >
                                <option value="all">Toutes</option>
                                <option value="attente">Electronique</option>
                                <option value="cours">Mode</option>
                                <option value="termine">Accessoire</option>
                            </select>
                        </div>
                        <button className='bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 text-white px-4 rounded-md text-sm py-1'>
                            Rechercher
                        </button>
                    </div>
                </div>
            </div>
            <div className='p-6 md:ml-60 pb-0 -mt-12'>
                <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
                        <div className='bg-black text-white p-2 rounded'>
                            <FiBox />
                        </div>
                        <p className='flex flex-col'>
                            <span className='text-sm'>Total <span className='hidden md:inline'>Produits</span></span>
                            <span className='font-bold'>34</span>
                        </p>
                    </div>
                    <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
                        <div className='bg-green-400 text-white p-2 rounded'>
                            <FiShoppingCart />
                        </div>
                        <p className='flex flex-col'>
                            <span className='text-sm'>Produits actifs</span>
                            <span className='font-bold'>34</span>
                        </p>
                    </div>
                    <div className='flex items-center p-5 rounded-md bg-white shadow gap-5'>
                        <div className='bg-green-400 text-white p-2 rounded'>
                            <FiDollarSign />
                        </div>
                        <p className='flex flex-col'>
                            <span className='text-sm'>Valeur totale</span>
                            <span className='font-bold'>FCFA 3400000</span>
                        </p>
                    </div>


                </div>

            </div>
            <div className='md:ml-60 px-5 mt-6 overflow-x-auto'>
                <table className='border-collapse min-w-[800px] w-full'>
                    <thead className='bg-gray-100 text-sm'>
                        <tr>
                            <th className='px-2 py-4 text-left'><p className='flex items-center'><span className='text-blue-500 mr-2'>#</span> Details produits</p></th>
                            <th className='px-2 py-4 text-left'><p className='flex items-center'><FiGrid className='inline text-green-500 mr-2' /> categorie</p></th>
                            <th className='px-2 py-4 text-left'><p className='flex items-center'><FaUserTie className='inline text-orange-500 mr-2' /> vendeur</p></th>
                            <th className='px-2 py-4 text-left'><p className='flex items-center'><FiDollarSign className='inline text-purple-500 mr-2' /> Prix & stock</p></th>
                            <th className='px-2 py-4 text-left'><p className='flex items-center'><FiSettings className='inline text-red-500 mr-2' /> Actions</p></th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='px-2 py-4 text-left flex'>
                                <div>
                                    <img src="/sac1.webp" alt="" className='h-24 w-24' />
                                </div>
                                <div className='ml-3'>
                                    <p className='font-bold'>Sac pour femme</p>
                                    <p className='text-xs text-gray-400'>Pour celles qui ont du goût voici les meilleurs sacs</p>
                                    <p className='bg-gray-300 p-1 rounded w-max text-xs'>ID:1</p>
                                </div>
                            </td>
                            <td className='px-2 py-4 text-left'>
                                <p>Mode</p>
                            </td>
                            <td className='px-2 py-4 text-left'>
                                <p className='font-bold'>Jean de dieu</p>
                                <p className='text-xs text-gray-400'>jean@gmail.com</p>
                                <p className='text-xs text-gray-400'>7580987691</p>
                            </td>
                            <td className='px-2 py-4 text-left'>
                                <p className='font-bold'>XAF 12000</p>
                                <p className='text-gray-300 line-through text-xs'>XAF 15000</p>
                                <p className='text-gray-400 text-xs'>
                                    <span className='inline-block h-2 w-2 rounded-full bg-green-500 mr-2'></span>
                                    En stock: 23
                                </p>
                            </td>
                            <td className='px-2 py-4 text-left'>
                                <div className='flex gap-5 text-gray-600'>
                                    <FiEdit className='cursor-pointer hover:text-blue-500' />
                                    <FiTrash2 className='cursor-pointer hover:text-red-500' />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default AdminProduct