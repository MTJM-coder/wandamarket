import NavBar2 from '@/Layouts/NavBar2'
import SideBar2 from '@/Layouts/SideBar2'
import SellerSideBar from '@/Layouts/sellerSideBar'
import NavBar3 from '@/Layouts/NavBar3'
import React from 'react'
import { useState } from 'react'
import { FiBox, FiDollarSign, FiTrendingUp, FiMapPin } from 'react-icons/fi'
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
import { usePage } from '@inertiajs/react'


const SellerStatistique = () => {
    const { props } = usePage()
    const percentage_d_o=props.percentage_d_o
    const percentage_w_o=props.percentage_w_o
    const percentage_c_o=props.percentage_c_o
    const best_customers = props.best_customers
    const best_products=props.best_products
    const best_cities=props.best_cities
    const data_stat=props.data_stat
    console.log("best_customers", best_customers)
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XAF',
            minimumFractionDigits: 0
        }).format(amount).replace('XAF', 'FCFA');
    };
   
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
            <div className="md:ml-72 px-4 md:px-8 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4">
                <h1 className="font-bold text-2xl">Statistiques de ma boutique</h1>
                <select
                    name="date"
                    className="mt-3 md:mt-0 py-2 px-5 rounded border bg-white shadow"
                >
                    <option value="general">Générale</option>
                    <option value="1">Aujourd'hui</option>
                    <option value="7">7 derniers jours</option>
                    <option value="30">30 derniers jours</option>
                    <option value="90">90 derniers jours</option>
                    <option value="365">365 derniers jours</option>
                </select>
            </div>

            <div className="md:ml-72 px-4 md:px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats principales */}
                <div className="lg:col-span-2">
                    {/* Cards Top */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white shadow p-6 rounded-lg border">
                            <p className="text-gray-600">Plus grosse commande(fcfa)</p>
                            <p className="font-bold text-2xl mt-2">{(props.max_com)}</p>
                        </div>
                        <div className="bg-white shadow p-6 rounded-lg border">
                            <p className="text-gray-600">Produits en vente</p>
                            <p className="font-bold text-2xl mt-2">{props.total_produits}</p>
                        </div>
                        <div className="bg-white shadow p-6 rounded-lg border">
                            <p className="text-gray-600">Avis moyen</p>
                            <p className="font-bold text-2xl mt-2">{props.avis_moyen} ★</p>
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
                                <p className="font-bold md:text-2xl mt-2 text-xl">FCFA {props.revenu}</p>
                            </div>
                            <div className="h-12 border"></div>
                            <div>

                                <p className="text-gray-600 items-center flex">
                                    <div className='inline-block bg-orange-500 p-1 mr-4 rounded-full text-white '>
                                        <FiBox className='' />
                                    </div>
                                    Commandes</p>
                                <p className="font-bold md:text-2xl text-xl mt-2">{props.total_order}</p>
                            </div>
                        </div>
                        <div className="text-xs  h-64  flex items-center justify-center text-gray-400 rounded-lg">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data_stat}>
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
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Clients
                    </h3>

                    <div className="space-y-6">
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <p className="text-sm text-gray-600 mb-1">Total Clients</p>
                            <p className="text-2xl font-bold text-gray-900">{props.total_clients}</p>
                            <div className="flex items-center gap-1 mt-2 text-blue-600 text-sm">
                                <FiTrendingUp className="text-xs" />
                                +{props.percentage_clients_month}% ce mois
                            </div>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-xl">
                            <p className="text-sm text-gray-600 mb-1">Meilleurs Clients</p>
                            {best_customers.map((bc) =>
                                <div>
                                    <p className="text-lg font-bold text-gray-900">{bc?.user?.prenom+' '+bc?.user?.nom }</p>
                                    <p className="text-purple-600 font-semibold text-sm">{bc?.total_commandes} commandes</p>
                                </div>
                            )}

                        </div>
                    </div>

                    <h2 className="font-bold text-lg mt-4 mb-4">Statut des commandes</h2>

                    {/* Livrées */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Livrées</span>
                            <span>{percentage_d_o}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-green-600 h-4 rounded-full" style={{ width: percentage_d_o+"%" }}></div>
                        </div>
                    </div>

                    {/* En attente */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span>En attente</span>
                            <span>{percentage_w_o}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-yellow-500 h-4 rounded-full" style={{ width: percentage_w_o+"%" }}></div>
                        </div>
                    </div>

                    {/* Annulées */}
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Annulées</span>
                            <span>{percentage_c_o}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-red-600 h-4 rounded-full" style={{ width: percentage_c_o+'%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section produits & villes */}
            <div className="md:ml-72 px-4 md:px-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg  border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                            Meilleurs Produits
                        </h3>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                            Voir tout
                        </button>
                    </div>

                    <div className="space-y-4">
                        {best_products.map((bp, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {bp.produit.nom}
                                    </h4>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span>{bp.total_quantite} ventes</span>
                                        <span className="text-green-600 font-semibold">
                                            {formatCurrency(bp.total_prix)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                                    <FiTrendingUp className="text-xs" />
                                    {bp.pourcentage}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white border shadow rounded-lg  border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Meilleures Villes
                    </h3>

                    <div className="space-y-4">
                        {best_cities.map((city, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                        <FiMapPin className="text-white text-sm" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{city.client_ville}</p>
                                        <p className="text-sm text-gray-600">{city.total_commandes} commandes</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-green-600">
                                        {formatCurrency(city.total_montant)}
                                    </p>
                                    {/* <p className="text-xs text-gray-500">{city.percentage}%</p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerStatistique
