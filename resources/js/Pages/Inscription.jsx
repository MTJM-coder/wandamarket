import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FiUser, FiMail, FiPhone, FiLock, FiCamera, FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { usePage } from '@inertiajs/react';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const { data, setData, post, processing, errors } = useForm({
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  ville: '',
  quartier: '',
  image: null,
 password: '',
  password_confirmation: ''
});

console.log(errors)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const submitForm = (e) => {
    e.preventDefault();
     post('/register', {
    forceFormData: true,
    onError: (errors) => {
      if (errors.nom || errors.prenom || errors.email || errors.telephone) {
        setStep(1);
      } else if (errors.image) {
        setStep(2);
      } else if (errors.password || errors.password_confirmation || errors.ville || errors.quartier) {
        setStep(3);
      }
    },
  });
  };

  return (
    <>
      <Head title="Inscription" />
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="font-bold text-3xl text-[#071726]">WANDA</div>
              <div className="font-bold text-3xl text-[#ec8d0c]">MARKET</div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#071726]">
            Créer un compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Déjà inscrit?{' '}
            <Link href="/login" className="font-medium text-[#d93d0f] hover:text-[#ec8d0c]">
              Connectez-vous
            </Link>
          </p>
        </div>

        {/* Indicateur d'étapes */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${step === stepNumber ? 'bg-[#ec8d0c] text-white' : 
                  step > stepNumber ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                  {step > stepNumber ? <FiCheck /> : stepNumber}
                </div>
                <span className="text-xs mt-2 text-gray-600">
                  {stepNumber === 1 ? 'Informations' : stepNumber === 2 ? 'Photo' : 'Sécurité'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {status && (
      <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md shadow-sm text-sm">
        {status}
      </div>
    )}
            <form onSubmit={submitForm}>
              {/* Étape 1: Informations de base */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="nom"
                        name="nom"
                        type="text"
                        value={data.nom}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.nom ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
                        required
                      />
                    </div>
                    {errors.nom && <p className="mt-2 text-sm text-red-600">{errors.nom}</p>}
                  </div>

                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="prenom"
                        name="prenom"
                        type="text"
                        value={data.prenom}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.prenom ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
                        required
                      />
                    </div>
                    {errors.prenom && <p className="mt-2 text-sm text-red-600">{errors.prenom}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
                        required
                      />
                    </div>
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                      Téléphone
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={data.telephone}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.telephone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
                        required
                      />
                    </div>
                    {errors.telephone && <p className="mt-2 text-sm text-red-600">{errors.telephone}</p>}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-4 py-2 bg-[#071726] text-white font-medium rounded-md hover:bg-[#0d2a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c]"
                    >
                      Suivant <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 2: Photo de profil */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">Photo de profil</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Ajoutez une photo pour personnaliser votre profil (optionnel)
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <FiUser className="h-16 w-16 text-gray-400" />
                        )}
                      </div>
                      <label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                        <FiCamera className="h-5 w-5 text-[#ec8d0c]" />
                        <input
                          id="image-upload"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                    </div>

                    {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c]"
                    >
                      <FiArrowLeft className="mr-2" /> Retour
                    </button>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Passer
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#071726] hover:bg-[#0d2a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c]"
                      >
                        Suivant <FiArrowRight className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Étape 3: Mot de passe */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
                      Ville
                    </label>
                    <input
                      id="ville"
                      name="ville"
                      type="text"
                      value={data.ville}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.ville ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
                      required
                    />
                    {errors.ville && <p className="mt-2 text-sm text-red-600">{errors.ville}</p>}
                  </div>

                  <div>
                    <label htmlFor="quartier" className="block text-sm font-medium text-gray-700">
                      Quartier
                    </label>
                    <input
                      id="quartier"
                      name="quartier"
                      type="text"
                      value={data.quartier}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.quartier ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
                      required
                    />
                    {errors.quartier && <p className="mt-2 text-sm text-red-600">{errors.quartier}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="mot_de_passe"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.password? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
                        required
                      />
                    </div>
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                      Confirmer le mot de passe
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="mot_de_passe_confirmation"
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.password_confirmation ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
                        required
                      />
                    </div>
                    {errors.password_confirmation && <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c]"
                    >
                      <FiArrowLeft className="mr-2" /> Retour
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#071726] hover:bg-[#0d2a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {processing ? 'Enregistrement...' : 'Finaliser l\'inscription'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;