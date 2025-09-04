import React, { useState } from "react";
import SideBar2 from "@/Layouts/SideBar2";
import NavBar2 from "@/Layouts/Navbar2";
import NavBar3 from "@/Layouts/NavBar3";
import SellerSideBar from "@/Layouts/SellerSideBar";
import { Card, CardContent } from "@/components/ui/card";
import { FiShoppingBag, FiBox, FiDollarSign, FiClock } from "react-icons/fi";

const SellerDashboard = () => {
    // === Données simulées ===
    const stats = {
        totalRevenue: "FCFA 2 500 000",
        totalOrders: 350,
        todayRevenue: "FCFA 150 000",
        todayOrders: 12,
        pendingOrders: 5,
    };

    const recentOrders = [
        {
            id: 101,
            client: "Alice",
            total: "25 000 FCFA",
            etat: "En attente",
            date: "2025-08-20",
            produits: [
                { nom: "Savon bio", quantite: 2 },
                { nom: "Crème visage", quantite: 1 },
            ],
        },
        {
            id: 102,
            client: "Bob",
            total: "45 000 FCFA",
            etat: "Livré",
            date: "2025-08-20",
            produits: [{ nom: "Huile essentielle", quantite: 3 }],
        },
        {
            id: 103,
            client: "Céline",
            total: "30 000 FCFA",
            etat: "En attente",
            date: "2025-08-19",
            produits: [
                { nom: "Lotion tonique", quantite: 1 },
                { nom: "Masque visage", quantite: 2 },
            ],
        },
        {
            id: 104,
            client: "David",
            total: "60 000 FCFA",
            etat: "Annulé",
            date: "2025-08-18",
            produits: [{ nom: "Parfum", quantite: 1 }],
        },
        {
            id: 105,
            client: "Emma",
            total: "20 000 FCFA",
            etat: "Livré",
            date: "2025-08-17",
            produits: [{ nom: "Gel douche", quantite: 2 }],
        },
    ];

    const dailyStats = [
        {
            label: "Revenu du jour",
            value: stats.todayRevenue,
            icon: <FiDollarSign className="text-yellow-500 text-3xl" />,
        },
        {
            label: "Commandes du jour",
            value: stats.todayOrders,
            icon: <FiBox className="text-purple-500 text-3xl" />,
        },
        {
            label: "Commandes en attente",
            value: stats.pendingOrders,
            icon: <FiClock className="text-red-500 text-3xl" />,
        },
    ];
    const [activeTab,setActiveTab]=useState('Accueil'); 
   
    return (
        <div className="bg-gray-100">
            {/* Navigation */}
            <NavBar3 />
            <SellerSideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className="flex h-screen md:ml-24">
                {/* Contenu principal */}
                <main className="flex-1 p-4 md:p-6 bg-gray-100 overflow-y-auto mt-16 ">
                    <h1 className="text-2xl font-bold mb-6">Tableau de Bord Vendeur</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
                            <div className="flex gap-4 items-center">
                                <div className="bg-blue-500 p-3 rounded-full text-white">
                                    <FiDollarSign className="text-2xl" />
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">Revenu Total</h2>
                                    <p className="text-xl font-semibold text-gray-800">{stats.totalRevenue}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
                            <div className="flex gap-4 items-center">
                                <div className="bg-orange-500 p-3 rounded-full text-white">
                                    <FiShoppingBag className="text-2xl" />
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">Total Commandes</h2>
                                    <p className="text-xl font-semibold text-gray-800">{stats.totalOrders}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
                            <div className="flex gap-4 items-center">
                                <div className="bg-green-500 p-3 rounded-full text-white">
                                    <FiBox className="text-2xl" />
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">Total Produits</h2>
                                    <p className="text-xl font-semibold text-gray-800">{stats.totalOrders}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === Statistiques du jour === */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold mb-4">Aujourd'hui</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {dailyStats.map((item, index) => (
                                <Card key={index} className="shadow-md hover:shadow-lg transition">
                                    <CardContent className="flex items-center gap-4 p-4">
                                        {item.icon}
                                        <div>
                                            <p className="text-gray-500 text-sm">{item.label}</p>
                                            <h2 className="text-xl font-bold">{item.value}</h2>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* === Commandes récentes === */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Commandes Récentes</h2>

                        {/* Vue desktop */}
                        <div className="hidden md:block">
                            <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
                                <thead className="bg-gray-50 text-gray-700">
                                    <tr>
                                        <th className="py-2 px-3">#Commande</th>
                                        <th className="py-2 px-3">Client</th>
                                        <th className="py-2 px-3">Montant</th>
                                        <th className="py-2 px-3">Statut</th>
                                        <th className="py-2 px-3">Date</th>
                                        <th className="py-2 px-3">Produits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order, index) => (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-gray-50 align-top transition"
                                        >
                                            <td className="py-2 px-3">{order.id}</td>
                                            <td className="py-2 px-3">{order.client}</td>
                                            <td className="py-2 px-3 font-medium">{order.total}</td>
                                            <td
                                                className={`py-2 px-3 font-semibold ${order.etat === "En attente"
                                                    ? "text-yellow-600"
                                                    : order.etat === "Livré"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                    }`}
                                            >
                                                {order.etat}
                                            </td>
                                            <td className="py-2 px-3">{order.date}</td>
                                            <td className="py-2 px-3">
                                                <ul className="list-disc pl-4">
                                                    {order.produits.map((item, idx) => (
                                                        <li key={idx}>
                                                            {item.nom} × {item.quantite}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Vue mobile */}
                        <div className="grid gap-4 md:hidden">
                            {recentOrders.slice(0, 5).map((order, index) => (
                                <div
                                    key={index}
                                    className="p-4 border rounded-xl shadow-sm bg-white"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500">
                                            Commande #{order.id}
                                        </p>
                                        <span
                                            className={`inline-block px-2 py-1 text-xs rounded-lg ${order.etat === "En attente"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : order.etat === "Livré"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {order.etat}
                                        </span>
                                    </div>
                                    <p className="text-gray-800 font-medium">{order.client}</p>
                                    <p className="text-gray-700">{order.total}</p>
                                    <p className="text-sm text-gray-500">Date : {order.date}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="mt-2">
                                            <p className="text-sm font-semibold">Produits :</p>
                                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                                {order.produits.map((item, idx) => (
                                                    <li key={idx}>
                                                        {item.nom} × {item.quantite}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button className="inline justify-end p-2 bg-black text-white rounded-lg">Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
           <div className="md:hidden mb-20">
  <p className="my-5 font-bold text-gray-700 text-lg">Abonnement</p>

  <div className="flex gap-4 overflow-x-auto p-2 scrollbar-hide">
    {/* Carte 1 */}
    <div className="bg-white rounded-2xl shadow-md p-4 w-72 flex-shrink-0">
      <div className="text-center mb-4">
        <p className="font-semibold text-lg">Défaut</p>
        <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
          Actif
        </span>
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="flex flex-col">
          <p className="text-sm text-gray-600">Commission</p>
          <p className="text-xs font-bold text-gray-800">
            10% sur les commandes (facturable à la fin du mois)
          </p>
        </div>

        <button className="w-full border rounded-lg py-2 mt-2 text-sm font-medium hover:bg-gray-50">
          Détails
        </button>
      </div>
    </div>

    {/* Carte 2 */}
    <div className="bg-white rounded-2xl shadow-md p-4 w-72 flex-shrink-0">
      <div className="text-center mb-4">
        <p className="font-semibold text-lg">Débutant</p>
        <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
          Actif
        </span>
      </div>

      <div className="border-t pt-4 space-y-3">
        <p className="text-center text-sm font-bold text-gray-800">
          500 FCFA / Mois
        </p>

        <button className="w-full border rounded-lg py-2 mt-2 text-sm font-medium hover:bg-gray-50">
          Détails
        </button>
      </div>
    </div>
  </div>
</div>


        </div>


    );
};

export default SellerDashboard;
