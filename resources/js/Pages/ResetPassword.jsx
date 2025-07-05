import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FiMail, FiPhone, FiLock, FiClock, FiArrowRight, FiCheck } from 'react-icons/fi';
import { usePage } from '@inertiajs/react';

const PasswordResetForm = () => {
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(300); // 5 minutes en secondes
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    otp_code: '',
    password: '',
   
  });

  // Formatage du compte à rebours
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Gestion du PrimaryButtoncompte à rebours
  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    post('/password/reset/step1', {
      onSuccess: () => setStep(2),
    });
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    post('/password/reset/step2', {
      onSuccess: () => setStep(3),
    });
  };

  const handleSubmitStep3 = (e) => {
    e.preventDefault();
    post('/password/reset/step3');
  };

  return (
    <>
      <Head title="Réinitialisation du mot de passe" />
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="font-bold text-3xl text-[#071726]">WANDA</div>
              <div className="font-bold text-3xl text-[#ec8d0c]">MARKET</div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#071726]">
            Réinitialisation du mot de passe
          </h2>
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
                  {stepNumber === 1 ? 'Identification' : stepNumber === 2 ? 'Code OTP' : 'Nouveau mot de passe'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Étape 1: Email/Téléphone */}
              {status && (
      <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md shadow-sm text-sm">
        {status}
      </div>
    )}
            {step === 1 && (
              <form onSubmit={handleSubmitStep1}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email_or_phone" className="block text-sm font-medium text-gray-700">
                      Email ou Téléphone
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {data.email.includes('@') ? (
                          <FiMail className="h-5 w-5 text-gray-400" />
                        ) : (
                          <FiPhone className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <input
                        id="email_or_phone"
                        name="email"
                        type="text"
                        value={data.email}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
                        required
                      />
                    </div>
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={processing}
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#071726] hover:bg-[#0d2a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {processing ? 'Envoi en cours...' : 'Envoyer le code'} <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Étape 2: Code OTP */}
            {step === 2 && (
              <form onSubmit={handleSubmitStep2}>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Un code de vérification a été envoyé à <span className="font-medium">{data.email}</span>
                    </p>
                  </div>

                  <div>
                    <label htmlFor="otp_code" className="block text-sm font-medium text-gray-700">
                      Code OTP
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="otp_code"
                        name="otp_code"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={data.otp_code}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border ${errors.otp_code ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
                        required
                      />
                    </div>
                    {errors.otp_code && <p className="mt-2 text-sm text-red-600">{errors.otp_code}</p>}
                  </div>

                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <FiClock className="mr-2" />
                    <span>Code valide pendant: {formatTime(countdown)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c]"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={processing || countdown <= 0}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#071726] hover:bg-[#0d2a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] ${processing || countdown <= 0 ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {processing ? 'Vérification...' : 'Vérifier le code'}
                    </button>
                  </div>

                  {countdown <= 0 && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setCountdown(300);
                          post('/password/reset/resend-otp');
                        }}
                        className="text-sm font-medium text-[#d93d0f] hover:text-[#ec8d0c]"
                      >
                        Renvoyer le code
                      </button>
                    </div>
                  )}
                </div>
              </form>
            )}

            {/* Étape 3: Nouveau mot de passe */}
            {step === 3 && (
              <form onSubmit={handleSubmitStep3}>
                <div className="space-y-6">
                  {/* message du status pour informer que le code est verifier */}
                  {errors.status && (
                    <div className="text-sm text-green-600 mb-4">
                      <FiCheck className="inline mr-2" />
                      {errors.status}
                    </div>
                  )}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Nouveau mot de passe
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#ec8d0c] focus:border-[#ec8d0c]`}
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
                        id="password_confirmation"
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
                      onClick={() => setStep(2)}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c]"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#071726] hover:bg-[#0d2a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec8d0c] ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {processing ? 'Enregistrement...' : 'Réinitialiser'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetForm;