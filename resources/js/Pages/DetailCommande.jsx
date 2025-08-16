import React from "react";
import { FaBoxOpen, FaTruck, FaPlaneDeparture, FaStore, FaCheckCircle ,FaComment} from "react-icons/fa";

const SuiviColis = () => {
  const etapes = [
    { id: 1, titre: "Commande passée", date: "21 Juil 2025", icone: <FaBoxOpen size={20} />, status: "fait" },
    { id: 2, titre: "En cours de préparation", date: "22 Juil 2025", icone: <FaStore size={20} />, status: "fait" },
    { id: 3, titre: "Expédiée", date: "23 Juil 2025", icone: <FaPlaneDeparture size={20} />, status: "fait" },
    { id: 4, titre: "En cours de Livraison", date: "", icone: <FaTruck size={20} />, status: "en-cours" },
    {id: 5, titre: "Reçue", date: "", icone: <FaCheckCircle size={20} />, status: "à-venir" },
    {id:6,titre:"Commentaires",date:"",icone:<FaComment size={20}/>,status:"à-venir"}
  ];

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Suivi de votre commande</h2>

      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
        {/* Bloc infos produit */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-2xl p-4 mb-6 md:mb-0">
          <h3 className="font-semibold mb-2">Commande #27023845</h3>
          <img
            src="/shoes.png"
            alt="Produit"
            className="rounded-xl w-full mb-3"
          />
          <p className="font-medium">Montant : <span className="text-green-600">19 000 FCFA</span></p>
          <p className="text-sm text-gray-500">Vendeur : Matango Store</p>
        </div>

        {/* Bloc suivi étapes */}
        <div className="w-full md:w-2/3 bg-white shadow-md rounded-2xl p-4">
          <ol className="relative border-l-4 border-gray-500">
            {etapes.map((etape) => (
              <li key={etape.id} className="mb-8 ml-6">
                <span
                  className={`absolute -left-4 flex items-center justify-center w-8 h-8 rounded-full
                    ${
                      etape.status === "fait"
                        ? "bg-green-500 text-white"
                        : etape.status === "en-cours"
                        ? "bg-orange-500 text-white animate-pulse"
                        : "bg-gray-300 text-gray-600"
                    }`}
                >
                  {etape.icone}
                </span>
                <h4 className="font-semibold">{etape.titre}</h4>
                {etape.date && <p className="text-sm text-gray-500">{etape.date}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SuiviColis;
