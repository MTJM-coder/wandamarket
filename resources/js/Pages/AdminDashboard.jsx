import React, { useState } from "react";
import AdminNavBar from "@/Layouts/AdminNavBar";
import {
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [periode, setPeriode] = useState("jour");

  // Données fictives CA par années
  const caComparatif = [
    { mois: "Jan", actuel: 150000, precedent: 120000 },
    { mois: "Fév", actuel: 180000, precedent: 130000 },
    { mois: "Mar", actuel: 220000, precedent: 200000 },
    { mois: "Avr", actuel: 200000, precedent: 180000 },
    { mois: "Mai", actuel: 240000, precedent: 210000 },
    { mois: "Juin", actuel: 260000, precedent: 230000 },
  ];

  // Données fictives vues du site
  const vuesSite = [
    { mois: "Jan", vues: 4000 },
    { mois: "Fév", vues: 3500 },
    { mois: "Mar", vues: 5000 },
    { mois: "Avr", vues: 4500 },
    { mois: "Mai", vues: 6000 },
    { mois: "Juin", vues: 7000 },
  ];

  // Villes qui commandent le plus
  const commandesParVille = [
    { ville: "Dakar", commandes: 1200 },
    { ville: "Abidjan", commandes: 950 },
    { ville: "Cotonou", commandes: 700 },
    { ville: "Yaoundé", commandes: 600 },
    { ville: "Lomé", commandes: 450 },
  ];

  // Meilleurs vendeurs
  const topVendeurs = [
    { boutique: "Fashion Queen", commandes: 320, ca: "450 000 FCFA" },
    { boutique: "TechWorld", commandes: 280, ca: "1 200 000 FCFA" },
    { boutique: "Cosmétiques Pro", commandes: 210, ca: "750 000 FCFA" },
    { boutique: "MarketPlus", commandes: 180, ca: "300 000 FCFA" },
    { boutique: "Food Express", commandes: 150, ca: "250 000 FCFA" },
  ];

  // Couleurs pour PieChart
  const COLORS = ["#2563eb", "#16a34a", "#f97316", "#9333ea", "#dc2626"];

  return (
    <div>
      <AdminNavBar active={active} setActive={setActive} />

      <div className="p-6 md:ml-60 mt-10 md:mt-0">
        <h2 className="text-2xl font-bold mb-6">Tableau de bord</h2>

        {/* Sélecteur période */}
        <div className="flex gap-2 mb-6">
          {["jour", "semaine", "mois", "annee", "global"].map((p) => (
            <button
              key={p}
              className={`px-3 py-1 rounded ${
                periode === p
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setPeriode(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Indicateurs rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-4 p-4 rounded-lg shadow bg-blue-500 text-white">
            <FiUsers size={30} />
            <div>
              <p className="text-lg font-bold">12 540</p>
              <p>Visiteurs</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg shadow bg-green-500 text-white">
            <FiShoppingCart size={30} />
            <div>
              <p className="text-lg font-bold">3 210</p>
              <p>Commandes</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg shadow bg-yellow-500 text-white">
            <FiDollarSign size={30} />
            <div>
              <p className="text-lg font-bold">1.5M FCFA</p>
              <p>Chiffre d’affaires</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg shadow bg-purple-500 text-white">
            <FiTrendingUp size={30} />
            <div>
              <p className="text-lg font-bold">+12%</p>
              <p>Tendance</p>
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Graphique vues du site */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-4 font-semibold">Évolution des vues du site</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vuesSite}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="vues" stroke="#16a34a" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* CA comparatif */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-4 font-semibold">
              Évolution CA (vs année précédente)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={caComparatif}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actuel" stroke="#2563eb" />
                <Line type="monotone" dataKey="precedent" stroke="#f97316" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Commandes par ville */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-4 font-semibold">Top villes (Commandes)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={commandesParVille}
                  dataKey="commandes"
                  nameKey="ville"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {commandesParVille.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Tableau Top vendeurs */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-4 font-semibold">Top vendeurs</h3>
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Boutique</th>
                  <th className="px-4 py-2 text-left">Commandes</th>
                  <th className="px-4 py-2 text-left">CA</th>
                </tr>
              </thead>
              <tbody>
                {topVendeurs.map((v, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{v.boutique}</td>
                    <td className="px-4 py-2">{v.commandes}</td>
                    <td className="px-4 py-2">{v.ca}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
