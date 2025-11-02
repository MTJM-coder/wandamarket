import React, { useState } from 'react';
import {
  FiEye,
  FiSearch,
  FiFilter,
  FiDownload,
  FiMail,
  FiPhone,
  FiMoreVertical,
  FiUser,
  FiShoppingBag,
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiStar,
  FiMapPin
} from 'react-icons/fi';

import NavBar3 from '@/Layouts/NavBar3'
import SellerSideBar from '@/Layouts/SellerSideBar'
import { usePage } from '@inertiajs/react';

const SellerClient = ({ clientList }) => {
  const [activeTab, setActiveTab] = useState("clients");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("totalSpent");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedClient, setSelectedClient] = useState(null);

  // Données simulées plus complètes
  const { props } = usePage();
  const clients = props.clients
  const getStatusColor = (status) => {
    switch (status) {
      case 'actif': return 'bg-green-100 text-green-800';
      case 'inactif': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const ClientDetailsModal = ({ client, onClose }) => {
     const moys = [
                      client?.moy_boutique ?? null,
                      client?.moy_produit ?? null
                    ].filter(v => v !== null);

                    const moyenne = moys.length > 0
                      ? (moys.reduce((a, b) => a + b, 0) / moys.length).toFixed(1)
                      : 0;
    return (

    <div className="fixed inset-0 bg-black bg-opacity-50  items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Détails du client</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {client?.user?.nom[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{client?.user?.nom}</h3>
                  
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiMail className="text-gray-500" />
                  <span className="text-sm">{client?.user?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-gray-500" />
                  <span className="text-sm">{client?.user?.telephone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-gray-500" />
                  <span className="text-sm">{client?.user?.ville}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-gray-500" />
                  <span className="text-sm">Client depuis le {formatDate(client?.user?.created_at)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <FiShoppingBag className="text-blue-600" />
                    <span className="text-sm text-gray-600">Commandes</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{client.total_commandes}</span>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <FiDollarSign className="text-green-600" />
                    <span className="text-sm text-gray-600">Total</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{formatCurrency(client.total_depense)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiStar className="text-yellow-500 fill-current" />

                  <span className="font-semibold">{moyenne}</span>
                  <span className="text-sm text-gray-600">Note client</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client?.user?.statut)}`}>
                  {client?.user?.statut}
                </div>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <a href={`mailto:${client?.user?.email}`}>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FiMail />
              Envoyer un mail
            </button>
            </a>
            <a href={`tel:${client?.user?.telephone}`}>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <FiPhone />
              Appeler
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Components */}
      <NavBar3 activeTab={activeTab} setActiveTab={setActiveTab} clients={clients} />
      <SellerSideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Container avec marge pour la sidebar */}
      <div className="md:pl-64 md:pt-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 ">
          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FiUser className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold">{clients.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FiTrendingUp className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Clients Actifs</p>
                  <p className="text-2xl font-bold">{clients.filter(c => c.user.statut === 'actif').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FiDollarSign className="text-orange-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">CA Total</p>
                  <p className="text-lg font-bold">{formatCurrency(clients.reduce((sum, c) => sum + c.total_depense, 0))}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Table des clients - Desktop */}
          <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Commandes</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Dépensé</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière Commande</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client) => {
                    const moys = [
                      client?.moy_boutique ?? null,
                      client?.moy_produit ?? null
                    ].filter(v => v !== null);

                    const moyenne = moys.length > 0
                      ? (moys.reduce((a, b) => a + b, 0) / moys.length).toFixed(1)
                      : 0;
                    return (
                      <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {client?.user?.nom[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{client?.user?.nom}</p>
                              <div className="flex items-center gap-2">
                              
                                <div className="flex items-center gap-1">
                                  <FiStar className="text-yellow-500 fill-current text-xs" />
                                  <span className="text-xs text-gray-600">{moyenne}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-gray-900">{client?.user?.email}</p>
                            <p className="text-gray-600">{client?.user?.telephone}</p>
                            <div className="flex items-center gap-1 text-gray-500">
                              <FiMapPin className="text-xs" />
                              <span className="text-xs">{client?.user?.ville}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-lg font-semibold">{client?.total_commandes}</span>
                          <p className="text-xs text-gray-500">commandes</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-lg font-bold text-green-600">
                            {formatCurrency(client?.total_depense)}
                          </span>
                          <p className="text-xs text-gray-500">
                            Moy: {formatCurrency(client.total_depense / client.total_commandes)}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">
                          {formatDate(client.last_order)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client?.user?.statut)}`}>
                            {client?.user?.statut}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => setSelectedClient(client)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                          >
                            <FiEye />
                            Voir
                          </button>
                        </td>
                      </tr>)
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards des clients - Mobile */}
          <div className="grid gap-4 lg:hidden mb-10">
            {clients.map((client) => {
              const moys = [
                client?.moy_boutique ?? null,
                client?.moy_produit ?? null
              ].filter(v => v !== null);

              const moyenne = moys.length > 0
                ? (moys.reduce((a, b) => a + b, 0) / moys.length).toFixed(1)
                : 0;
              return (
                <div key={client.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {client?.user?.nom[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{client?.user?.nom}</h3>
                       
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client?.user?.statut)}`}>
                      {client?.user?.statut}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Commandes</p>
                      <p className="text-lg font-semibold">{client.total_commandes}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total dépensé</p>
                      <p className="text-lg font-bold text-green-600">{formatCurrency(client.total_depense)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <p>Dernière commande: {formatDate(client.last_order)}</p>
                    </div>
                    <button
                      onClick={() => setSelectedClient(client)}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Détails
                    </button>
                  </div>
                </div>)
            })}
          </div>
        </div>

        {/* Modal des détails client */}
        {selectedClient && (
          <ClientDetailsModal
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        )}
      </div>
    </div>
  );
};

export default SellerClient;