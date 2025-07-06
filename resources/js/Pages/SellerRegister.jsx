import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FiArrowLeft, FiMapPin, FiInfo, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';
import { FaStore } from 'react-icons/fa';

const SellerRegister = () => {
  const { data, setData, post, processing, errors } = useForm({
    nom: '',
    ville: '',
    quartier: '',
    description: '',
    telephone: '',
    email: '',
    site_web: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/seller-register');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-2xl font-bold">
            <span className="text-[#071726]">WANDA</span>
            <span className="text-[#ec8d0c]">MARKET</span>
          </Link>
          <Link 
            href="/produit" 
            className="flex items-center text-[#071726] hover:text-[#ec8d0c] transition"
          >
            <FiArrowLeft className="mr-2" />
            Retour
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Form Header */}
          <div className="bg-[#071726] p-6 text-white">
            <div className="flex items-center">
              <FaStore className="text-3xl mr-4 text-[#ec8d0c]" />
              <div>
                <h1 className="text-2xl font-bold">Créer ma boutique</h1>
                <p className="text-gray-300">Remplissez les informations de votre boutique</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Nom de la boutique */}
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la boutique *
              </label>
              <div className="relative">
                <input
                  id="nom"
                  type="text"
                  value={data.nom}
                  onChange={(e) => setData('nom', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent ${
                    errors.nom ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Ma Belle Boutique"
                  required
                />
                {errors.nom && (
                  <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
                )}
              </div>
            </div>

            {/* Ville et Quartier */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-1">
                  Ville *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <input
                    id="ville"
                    type="text"
                    value={data.ville}
                    onChange={(e) => setData('ville', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent ${
                      errors.ville ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Abidjan"
                    required
                  />
                  {errors.ville && (
                    <p className="mt-1 text-sm text-red-600">{errors.ville}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="quartier" className="block text-sm font-medium text-gray-700 mb-1">
                  Quartier *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <input
                    id="quartier"
                    type="text"
                    value={data.quartier}
                    onChange={(e) => setData('quartier', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent ${
                      errors.quartier ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Cocody"
                    required
                  />
                  {errors.quartier && (
                    <p className="mt-1 text-sm text-red-600">{errors.quartier}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                  <FiInfo className="text-gray-400" />
                </div>
                <textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  rows={4}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Décrivez votre boutique en quelques mots..."
                  required
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    id="telephone"
                    type="tel"
                    value={data.telephone}
                    onChange={(e) => setData('telephone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent ${
                      errors.telephone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: +225 07 00 00 00 00"
                    required
                  />
                  {errors.telephone && (
                    <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email de contact *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: contact@maboutique.com"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Site web */}
            <div>
              <label htmlFor="site_web" className="block text-sm font-medium text-gray-700 mb-1">
                Site web (optionnel)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiGlobe className="text-gray-400" />
                </div>
                <input
                  id="site_web"
                  type="url"
                  value={data.site_web}
                  onChange={(e) => setData('site_web', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ec8d0c] focus:border-transparent ${
                    errors.site_web ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: https://www.maboutique.com"
                />
                {errors.site_web && (
                  <p className="mt-1 text-sm text-red-600">{errors.site_web}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={processing}
                className="w-full md:w-auto px-6 py-3 bg-[#071726] text-white font-medium rounded-lg hover:bg-[#0d2a40] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] disabled:opacity-50"
              >
                {processing ? 'Enregistrement...' : 'Créer ma boutique'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;