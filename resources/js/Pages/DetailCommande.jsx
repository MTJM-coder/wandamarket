import React from "react";
import { FaBoxOpen, FaTruck, FaPlaneDeparture, FaStore, FaCheckCircle, FaComment } from "react-icons/fa";
import { FiBox, FiClock, FiMessageSquare } from "react-icons/fi";

const SuiviColis = () => {
  const etapes = [
    { id: 1, titre: "Commande", date: "21 Juil 2025", icone: <FaBoxOpen className="text-[8px] md:text-sm" />, status: "fait" },
    { id: 2, titre: "préparation", date: "22 Juil 2025", icone: <FaStore className="text-[8px] md:text-sm" />, status: "fait" },
    // { id: 3, titre: "Expédiée", date: "23 Juil 2025", icone: <FaPlaneDeparture className="text-sm" />, status: "fait" },
    { id: 4, titre: "Livraison", date: "", icone: <FaTruck className="text-[8px] md:text-sm" />, status: "en-cours" },
    { id: 5, titre: "Reçue", date: "", icone: <FaCheckCircle className="text-[8px] md:text-sm" />, status: "à-venir" },
    { id: 6, titre: "Commentaires", date: "", icone: <FaComment className="text-[8px] md:text-sm" />, status: "à-venir" }
  ];

  const confirmReception = () => {
    if (confirm("Vous confirmez avoir recu votre commande?")) {
      alert("reception confirme Merci pour votre achat"),
        window.location.href = "/buyer/order/avis"
    }
  }

  return (
    <div>

      <div className="p-4 md:p-8">
        <div className=" text-center text-2xl text-white h-36 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700 flex flex-col items-center  pt-5">
          <div className="p-2 bg-orange-200 rounded-md ">
            <FiBox />
          </div>
          <p className="font-bold">suivez votre commande</p>
          <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. A error at cum odit voluptatum,</p>
        </div>
        {/* <h2 className="text-xl md:text-2xl font-bold mb-6">Suivi de votre commande</h2> */}

        <div className="flex flex-col  ">
          <div className=" bg-white border rounded-md p-4 my-4">
            <div className="flex items-center gap-3 text-2xl font-bold mb-4 ml-4 ">
              <div className="p-2 rounded bg-orange-300 text-white"><FiClock /></div>
              <div>
                <p className="text-sm md:text-inherit">Commande reçue</p>
                <p className="text-xs text-[7px] font-normal">Nous avons reçu votre commande et elle est en cours de traitement</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between w-max md:w-full mt-6">


              {etapes.map((etape) => (
                <div key={etape.id} className="relative flex flex-col items-center">
                  {/* Cercle */}
                  <div className="flex  items-center">
                    <div
                      className={`flex items-center justify-center w-4 h-4 md:w-10 md:h-10 rounded-full z-10
                        ${etape.status === "fait"
                          ? "bg-green-500 text-white"
                          : etape.status === "en-cours"
                            ? "bg-orange-500 text-white animate-pulse"
                            : "bg-gray-300 text-gray-600"
                        }`}
                    >

                      {etape.icone}
                    </div>
                    <div className={` h-1 md:w-40 w-7 ${etape.status == "en-cours" || etape.status == "fait" ? 'bg-orange-500' : "bg-gray-500"}`}></div>


                  </div>
                  <h4 className="mt-2 text-[6px] md:text-xs font-semibold">{etape.titre}</h4>

                </div>
              ))}
            </div>

          </div>
          <div className="bg-white mb-4 p-4 border rounded-md">
            <div>
              <p className="text-gray-400 text-xs">Acheteur</p>
              <p className="font-semibold">Jean du pain de la banane</p>
            </div>
            <p className="text-gray-400">Cameroun,Douala,yassa</p>
            <div className="mt-2 space-y-1">
              <p className="text-gray-400 text-xs">Date de commande</p>
              <p className="font-semibold">10/05/2025</p>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-gray-400 text-xs">Numéro de commande</p>
              <p className="font-semibold">2345364256278</p>
            </div>

          </div>
          <div className="bg-white p-4 border rounded-md text-gray-400">
            <div className="border-b items-center flex justify-between w-full text-xs">
              <div className="flex items-center gap-1 mb-4">
                <FaStore />
                <p>Boutique du luxe</p>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <FiMessageSquare />
                <a href="">Discuter</a>
              </div>

            </div>
            <div className="flex my-4 gap-4">
              <div>
                <img
                  src="/shoes.png"
                  alt="Produit"
                  className="rounded-xl  mb-3 h-24 w-24"
                />
              </div>
              <div className="">
                <p className="text-gray-600">nom du produit</p>
                <p className="text-gray-400 text-xs">variations</p>
                <div className="flex gap-5 mt-5">
                  <p className="text-black font-bold text-end">1000 FCFA</p>
                  <p className="text-end">x10</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-md bg-white p-2 my-4">
            <p className="font-bold mb-4">Recapitulatif de la commande</p>
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">Montant total du produit</p>
              <p className="font-semibold text-sm">100000 FCFA</p>  
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">Frais de livraison</p>
              <p className="font-semibold text-sm">1000 FCFA</p>  
            </div>
            <hr />
            <div className="flex justify-between mt-5">
              <p className="text-xs text-gray-400">Montant total de la commande</p>
              <p className="font-semibold text-sm">1000 FCFA</p>  
            </div>
          </div>



          {/* Bloc suivi étapes */}

        </div>
        {etapes.titre === "Reçue" && etapes.status === "fait" && (
          <div className="mt-6 p-4 bg-white shadow-md rounded-2xl">
            <p>la reception de cette commande a ete confirmée. Vous pouvez laisser un commentaire et/ou une note sur la qualité de l'article ou du vendeur. cela aidera d'autres clients.</p>
            <p className="mt-2">Merci pour votre achat !</p>
            <button className="my-3 p-3 bg-orange-500 text-white rounded-3xl">Ecrire un avis</button>
          </div>
        )}

        <div className="mt-6 p-4 bg-white  rounded-2xl">
          <p className="mt-2">1. Veuillez confirmer la reception de votre commande apres l'avoir recu</p>
          <p className="mt-2">2. Vous pouvez laisser un commentaire sur la qualité du produit</p>
          <p className="mt-2">3. Vous pouvez suivre l'état de votre commande en temps réel</p>
          <p className="mt-2">4. Si vous avez des questions, n'hésitez pas à contacter le vendeur</p>
          <p className="mt-2">5. Merci pour votre achat !</p>
        </div>
        <div className="mt-6 flex">
          <button className={`p-3 bg-orange-500 text-white rounded-lg  w-full`} onClick={() => confirmReception()}>Confirmer la reception</button>
        </div>
      </div>
    </div>
  );
};

export default SuiviColis;
