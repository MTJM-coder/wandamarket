import NavBar2 from '@/Layouts/NavBar2'
import SideBar2 from '@/Layouts/SideBar2'
import SellerSideBar from '@/Layouts/sellerSideBar'
import NavBar3 from '@/Layouts/NavBar3'
import React from 'react'
import { useState } from 'react'
import { FiBox, FiDollarSign } from 'react-icons/fi'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'


const SellerStatistique = () => {
    const data = [
        { date: 'Jan', commandes: 400, revenus: 2400 },
        { date: 'Fév', commandes: 300, revenus: 1398 },
        { date: 'Mar', commandes: 200, revenus: 9800 },
        { date: 'Avr', commandes: 278, revenus: 3908 },
        { date: 'Mai', commandes: 189, revenus: 4800 },
        { date: 'Juin', commandes: 239, revenus: 3800 },
        { date: 'Juil', commandes: 349, revenus: 4300 },
        { date: 'Août', commandes: 400, revenus: 2400 },
        { date: 'Sep', commandes: 300, revenus: 1398 },
        { date: 'Oct', commandes: 200, revenus: 9800 },
        { date: 'Nov', commandes: 278, revenus: 3908 },
        { date: 'Déc', commandes: 189, revenus: 4800 },
    ]
    const [activeTab, setActiveTab] = useState('statistiques');
    return (
        <div className="bg-gray-50 min-h-screen mb-10">
            <NavBar3 activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* <SideBar2 className="mt-0" /> */}
            <SellerSideBar activeTab={'statistiques'} setActiveTab={setActiveTab} />

            {/* Header */}
            <div className="md:ml-32 px-4 md:px-8 mt-24 flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4">
                <h1 className="font-bold text-2xl">Statistiques de ma boutique</h1>
                <select
                    name="date"
                    className="mt-3 md:mt-0 py-2 px-5 rounded border bg-white shadow"
                >
                    <option value="1">Aujourd'hui</option>
                    <option value="7">7 derniers jours</option>
                    <option value="30">30 derniers jours</option>
                    <option value="90">90 derniers jours</option>
                    <option value="365">365 derniers jours</option>
                </select>
            </div>

            <div className="md:ml-32 px-4 md:px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats principales */}
                <div className="lg:col-span-2">
                    {/* Cards Top */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white shadow p-6 rounded-lg border">
                            <p className="text-gray-600">Plus grosse commande</p>
                            <p className="font-bold text-2xl mt-2">1,250</p>
                        </div>
                        <div className="bg-white shadow p-6 rounded-lg border">
                            <p className="text-gray-600">Produits en vente</p>
                            <p className="font-bold text-2xl mt-2">5,430</p>
                        </div>
                        <div className="bg-white shadow p-6 rounded-lg border">
                            <p className="text-gray-600">Avis moyen</p>
                            <p className="font-bold text-2xl mt-2">4.5 ★</p>
                        </div>
                    </div>

                    {/* Graph */}
                    <div className="bg-white shadow rounded-lg md:p-6 py-3 px-2 border">
                        <p className="font-bold text-lg mb-4">Ventes au fil du temps</p>
                        <div className="flex justify-between mb-6">
                            <div>
                                <p className="text-gray-600 flex items-center">
                                    <div className='inline-block  bg-green-600 p-1 mr-4 rounded-full text-white'>
                                        <FiDollarSign className='' />
                                    </div>
                                    Revenu total
                                </p>
                                <p className="font-bold md:text-2xl mt-2 text-xl">FCFA 25,430.00</p>
                            </div>
                            <div className="h-12 border"></div>
                            <div>

                                <p className="text-gray-600 items-center flex">
                                    <div className='inline-block bg-orange-500 p-1 mr-4 rounded-full text-white '>
                                        <FiBox className='' />
                                    </div>
                                    Commandes</p>
                                <p className="font-bold md:text-2xl text-xl mt-2">1,250</p>
                            </div>
                        </div>
                        <div className="text-xs  h-64  flex items-center justify-center text-gray-400 rounded-lg">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="commandes" stroke="#FFA500" strokeWidth={2} />
                                    <Line type="monotone" dataKey="revenus" stroke="#10B981" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Clients */}
                <div className="bg-white shadow rounded-lg p-6 border">
                    <h2 className="font-bold text-lg mb-4">Clients</h2>
                    <div className="md:space-y-6 grid grid-cols-2 gap-4 md:grid-cols-1 ">
                        <div className='bg-gray-200 p-4 rounded-lg md:bg-inherit'>
                            <p className="text-gray-600">Nombre total de clients</p>
                            <p className="font-bold text-2xl mt-2">1,250</p>
                        </div>
                        <div className='bg-gray-200 p-4 rounded-lg md:bg-inherit'>
                            <p className="text-gray-600 ">Meilleur client</p>
                            <p className="font-bold text-xl mt-2">Joe la banane</p>
                            <p className="text-green-600 font-semibold">2 commades</p>

                        </div>
                    </div>

                    <h2 className="font-bold text-lg mt-4 mb-4">Statut des commandes</h2>

                    {/* Livrées */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Livrées</span>
                            <span>65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-green-600 h-4 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                    </div>

                    {/* En attente */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span>En attente</span>
                            <span>25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                    </div>

                    {/* Annulées */}
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Annulées</span>
                            <span>10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-red-600 h-4 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section produits & villes */}
            <div className="md:ml-32 px-4 md:px-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg p-6 border">
                    <h2 className="font-bold text-lg mb-3">Mes meilleurs produits</h2>
                    <div className='flex bg-gray-200 p-4 rounded-lg mb-4 gap-4'>
                        <p className="text-gray-600">Veste homme</p>
                        <p className="font-bold">150 ventes</p>
                        <p className="text-green-600 font-semibold">25,000 FCFA</p>
                    </div>
                    <div className='flex bg-gray-200 p-4 rounded-lg mb-4 gap-4'>
                        <p className="text-gray-600">Veste homme</p>
                        <p className="font-bold">150 ventes</p>
                        <p className="text-green-600 font-semibold">25,000 FCFA</p>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg py-6 px-2  border">
                    <h2 className="font-bold text-lg mb-3">Meilleure ville de commande</h2>
                    <div className='flex bg-gray-200 p-4 gap-5 rounded-lg mb-4'>
                        <p className="text-gray-600">Dakar</p>
                        <p className="font-bold">500 commandes</p>
                        <p className="text-green-600 font-semibold">5,000,000 FCFA</p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default SellerStatistique
