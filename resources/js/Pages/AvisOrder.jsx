
import React, { useState, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';

const AvisOrder = () => {
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [rating, setRating] = useState(0);
const handleClick = (id) => {
    setRating(id);
  };

  const stars = [1, 2, 3, 4, 5];
  
  const handleClickOnFile1 = () => fileInputRef1.current.click();
  const handleClickOnFile2 = () => fileInputRef2.current.click();

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage1(URL.createObjectURL(file));
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage2(URL.createObjectURL(file));
  };

  return (
    <div className="p-4 md:p-8 bg-white shadow-lg rounded-2xl max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Avis sur la commande
        <span className="text-gray-500 text-sm ml-3">#463457839376</span>
      </h1>
      <p className="text-gray-500 mb-6 text-sm md:text-base">
        Laissez un avis sur votre commande pour aider les autres acheteurs.
      </p>

      <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* Bloc produit */}
        <div className="flex flex-col items-center md:items-start w-full md:w-[30%]">
          <img src="/wach.png" alt="Produit" className="h-24 w-24 rounded-md object-cover mb-2" />
          <p className="text-gray-400 text-sm text-center md:text-left">Nom du produit</p>
        </div>

        {/* Bloc avis */}
        <div className="flex-1">
          <p className="mb-2 font-medium">Notez la qualité du produit :</p>
          <div className="flex gap-1 mb-4 text-yellow-400">
            {stars.map((etoile)=>
            (
             <div>
              {rating < etoile ? <FiStar onClick={()=>setRating(etoile)} className='cursor-pointer'/>:<FaStar  onClick={()=>setRating(etoile)} className='cursor-pointer'/>}
            </div>
            )
            )}

            {/* {[...Array(5)].map((i) => (
              <div>
              <FiStar  key={i} className="text-xl cursor-pointer hover:scale-110 transition" />
              </div>
              
            ))} */}
          </div>

          <form>
            <input type="text" value={rating} name='rating' className='hidden' />
            <textarea
              name="avis"
              placeholder="Écrivez quelque chose..."
              className="border rounded-md h-24 w-full p-3 mb-4 resize-none text-sm focus:outline-orange-400"
              autoFocus
            ></textarea>

            <label className="block mb-2 font-medium text-sm">Photos du produit</label>
            <div className="grid grid-cols-2 gap-4">
              {/* Upload 1 */}
              <div
                className="border border-dashed border-gray-400 rounded-md h-28 w-full bg-gray-100 flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
                onClick={handleClickOnFile1}
              >
                {selectedImage1 ? (
                  <img
                    src={selectedImage1}
                    alt="Aperçu 1"
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  <p className="text-3xl font-bold text-gray-500">+</p>
                )}
                <input
                  ref={fileInputRef1}
                  type="file"
                  name="photos1"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange1}
                />
              </div>

              {/* Upload 2 */}
              <div
                className="border border-dashed border-gray-400 rounded-md h-28 w-full bg-gray-100 flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
                onClick={handleClickOnFile2}
              >
                {selectedImage2 ? (
                  <img
                    src={selectedImage2}
                    alt="Aperçu 2"
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  <p className="text-3xl font-bold text-gray-500">+</p>
                )}
                <input
                  ref={fileInputRef2}
                  type="file"
                  name="photos2"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange2}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Bouton d'envoi */}
      <div className="flex justify-center mt-8">
        <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition text-sm md:text-base">
          Envoyer l'avis
        </button>
      </div>
    </div>
  );
};

export default AvisOrder;
