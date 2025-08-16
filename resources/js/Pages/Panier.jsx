import React, { useState } from 'react';
import NavBar2 from '@/Layouts/NavBar2';
import { FiDelete, FiTrash } from 'react-icons/fi';

const Panier = () => {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <>
            <NavBar2 />
            <div className="flex mt-24 ">
                <div className="px-4 w-[70%] max-w-4xl ml-10">
                    <h1 className="text-3xl font-bold mb-6">Mon panier</h1>

                    <div className="bg-white rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-semibold mb-3">
                            Boutique du vêtement de Mboppi
                        </h2>

                        <div className="flex items-center justify-between gap-4 bg-gray-100 p-7">
                            {/* Image produit */}
                            <div className='flex items-center gap-4'>
                                <img
                                    src="/sac1.webp"
                                    alt="T-shirt"
                                    className="h-16 w-16 rounded-lg object-cover inline-block"
                                />

                                {/* Infos produit */}
                                <div className="inline-block ml-4 ">
                                    <p className="font-medium">T-shirt pour adulte</p>
                                    <p className="text-gray-500 text-sm">
                                        Couleur : Rouge / Taille : M
                                    </p>
                                    <p className="text-orange-500 font-semibold">
                                        Prix unitaire : 2000F
                                    </p>
                                </div>
                            </div>

                            {/* Contrôles quantité */}
                            <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
                                <button
                                    onClick={decrementQuantity}
                                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span className="min-w-[30px] text-center">Quantité: {quantity}</span>
                                <button
                                    onClick={incrementQuantity}
                                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                            <button className='p-2 bg-red-100 rounded-full hover:bg-red-200'>
                                <FiTrash className="text-red-500 hover:text-red-700 text-xl" />
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-semibold mb-3">
                            Boutique du vêtement de Mboppi
                        </h2>

                        <div className="flex items-center justify-between gap-4 bg-gray-100 p-7">
                            {/* Image produit */}
                            <div className='flex items-center gap-4'>
                                <img
                                    src="/sac1.webp"
                                    alt="T-shirt"
                                    className="h-16 w-16 rounded-lg object-cover inline-block"
                                />

                                {/* Infos produit */}
                                <div className="inline-block ml-4 ">
                                    <p className="font-medium">T-shirt pour adulte</p>
                                    <p className="text-gray-500 text-sm">
                                        Couleur : Rouge / Taille : M
                                    </p>
                                    <p className="text-orange-500 font-semibold">
                                        Prix unitaire : 2000F
                                    </p>
                                </div>
                            </div>

                            {/* Contrôles quantité */}
                            <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
                                <button
                                    onClick={decrementQuantity}
                                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span className="min-w-[30px] text-center">Quantité: {quantity}</span>
                                <button
                                    onClick={incrementQuantity}
                                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                            <button className='p-2 bg-red-100 rounded-full hover:bg-red-200'>
                                <FiTrash className="text-red-500 hover:text-red-700 text-xl" />
                            </button>
                        </div>
                    </div>
                   
                </div>
                <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg w-[30%]">
                    <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
                    <div className="flex justify-between mb-2">
                        <span className="font-medium">Total des articles :</span>
                        <span className="text-orange-500 font-semibold">2000F</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-medium">Frais de livraison :</span>
                        <span className="text-orange-500 font-semibold">500F</span>
                       
                    </div>
                     <span className='block italic text-sm'>(Commandez et payez a la livraison)</span>
                    <hr className="my-4" />
                    <div className="flex justify-between font-bold">
                        <span>Total à payer :</span>
                        <span className="text-orange-600">2500F</span>
                        
                    </div>
                    <button className="mt-10 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
                        Commander maintenant
                    </button>
                </div>
            </div>
        </>
    );
};

export default Panier;
