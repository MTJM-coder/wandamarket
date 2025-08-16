import React from 'react';
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhoneCall,
  FiMapPin
} from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* À propos */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-600">À propos</h3>
          <p className="text-sm">
            WandaMarket est votre plateforme de confiance pour acheter, vendre et découvrir les meilleurs produits au Cameroun.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-600">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <FiPhoneCall className="mr-2" /> +237 6 50 09 05 89
            </li>
            <li className="flex items-center">
              <FiMail className="mr-2" /> contact@wandamarket.com
            </li>
            <li className="flex items-center">
              <FiMapPin className="mr-2" /> Douala, Cameroun
            </li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-600">Suivez-nous</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-orange-500"><FiFacebook /></a>
            <a href="#" className="hover:text-orange-500"><FiInstagram /></a>
            <a href="#" className="hover:text-orange-500"><FiTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-gray-300 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} WandaMarket. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
