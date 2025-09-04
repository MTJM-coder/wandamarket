import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import {
  FiPlus, FiEdit, FiTrash2, FiPackage, FiBarChart2,
  FiSettings, FiUsers, FiDollarSign, FiImage, FiSearch,
  FiEye, FiEyeOff, FiChevronDown, FiChevronUp,
  FiPenTool, FiHome, FiShoppingBag, FiHeart, FiUser, FiMessageSquare, FiInbox, FiMapPin, FiLogOut,
  FiBox,
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCcw
} from 'react-icons/fi';
import { FaStore } from 'react-icons/fa';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
// import SideBar2 from '@/Layouts/SideBar2';
import NavBar2 from '@/Layouts/NavBar2';
import SellerDashboard from './SellerDashboard';
import Parametre from './Parametre';
import SellerSideBar from '@/Layouts/sellerSideBar';
import SellerProducts from './SellerProducts';
import SellerClient from './SellerClient';





const MaBoutique = ({produit,categorie}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const { props } = usePage();
  const Maboutique = props.boutique
  const produits = props.produits
  const commandes = props.commandes
  const categories = props.categories
  const commandeMois = props.commandeMois
  const revenuMois = props.revenuMois
  const pourcentageCom = props.pourcentageCom
  const pourcentageRev = props.pourcentageRev
  const produitPopulaires = props.produitPopulaires
  const succes = props.flash?.succes
  if (!Maboutique) {
    return <div>Chargement de la boutique...</div>;
  }
  const boutique = {
    id: Maboutique.id,
    nom: Maboutique.nom,
    ville: Maboutique.ville,
    quartier: Maboutique.quartier,
    description: Maboutique.description,
    telephone: Maboutique.telephone,
    email: Maboutique.email,
    logo: Maboutique.image,
    statut: Maboutique.etat,
    date_creation: Maboutique.created_at
  };

  const COMMANDES = [
    {
      id: "#270238450501025537",
      date: "21-07-2025, 07:00",
      prix: "19,000 FCFA",
      acheteur: "Jean Dupont",
      etat: "En attente de confirmation",
      adresse: "Yassa, Douala",
      article: "DY-03 Montre Femme Quartz Mode avec Bracelet en Pierres Précieuses, Boucles d’oreilles et Bague",
      categorie: "Mode",
      couleur: "Vert",
      quantite: 10,
      imageUrl: "/wach.png",
    },

    {
      id: "#270238450501025538",
      date: "12-02-2025, 14:00",
      prix: "10,000 FCFA",
      acheteur: "Amina Sow",
      etat: "Livrée",
      adresse: "Dakar Plateau, Douala, Cameroun",
      article: "Vêtement de femme",
      categorie: "Mode",
      couleur: "Rouge",
      quantite: 2,
      imageUrl: "/dressGirl.png",
    },
  ];

  const clients = [
    {
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      phone: "+237 699 99 99 99",
      ordersCount: 5,
      totalSpent: 125000,
      lastOrderDate: "20-08-2025",
    },
    {
      name: "Marie Claire",
      email: "marie.claire@example.com",
      phone: "+237 677 77 77 77",
      ordersCount: 2,
      totalSpent: 55000,
      lastOrderDate: "15-08-2025",
    },
  ]




  const [activeTab, setActiveTab] = useState('Acceuil');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);



  // Fonctions de gestion
  const handleDeleteProduct = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      router.delete(`/produit/${id}`);

    }
  };
  const handleUpdateBoutique = (e) => {

  }
  const handleSaveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (selectedProduct) {
      // Cas modification
      router.post('/produit/update/' + selectedProduct.id, formData, {
        forceFormData: true,
        onSuccess: () => {
          setSelectedProduct(null);
          setActiveTab('produits');
        }
      });
    } else {
      // Cas ajout
      router.post('/produit/save', formData, {
        forceFormData: true,
        onSuccess: () => {
          setSelectedProduct(null);
          setActiveTab('produits');
        }
      });
    }
  };


  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Filtrage des produits
  const filteredProducts = produit.filter(produit =>
    produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [previews, setPreviews] = useState([]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerSideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      
      {activeTab == "parametres" && (
        window.location.href = '/parametre'
      )}


      {/* Content Area */}
      <div className="md:ml-24 flex-1 bg-white rounded-lg shadow overflow-hidden">
        {activeTab == "Accueil" && (
          <SellerDashboard />

        )}


        {/* Produits Tab */}
        {activeTab === 'produits' && (
          <div className="md:p-6">
            <SellerProducts produit={produit}/>
          </div>
        )}
        
        

        {/* Ajouter/Modifier Produit Tab */}
       

        {/* Commandes Tab */}
        

        {activeTab === "clients" && (
          <SellerClient clienList={clients}/>
        )}

      </div>
    </div>

  );
}


export default MaBoutique;