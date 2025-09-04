import React, { useState } from "react";
import { User, Store, CreditCard, Truck, Bell, Shield, BarChart3, Settings, Upload, Camera, MapPin, Clock, Phone, Mail, Globe, Save, Eye, EyeOff, Plus, X, Check } from "lucide-react";

const SellerSettings = () => {
    const [activeSection, setActiveSection] = useState("profil");
    const [showPassword, setShowPassword] = useState(false);
    const [abonnement, setAbonnement] = useState("Gratuit");
    const [gererStock, setGererStock] = useState(true);
    const [assistants, setAssistants] = useState([
        { id: 1, nom: "Jaudel", email: "jaudel@example.com", role: "Admin" },
    ]);

    // États pour le profil
    const [profil, setProfil] = useState({
        nomBoutique: "Ma Boutique",
        description: "Description de ma boutique",
        telephone: "+237 6XX XXX XXX",
        email: "contact@maboutique.com",
        adresse: "Douala, Cameroun",
        siteWeb: "",
        logo: null
    });

    // États pour les paramètres financiers
    const [compteBancaire, setCompteBancaire] = useState({
        banque: "",
        numeroCompte: "",
        nomTitulaire: "",
        mobile: ""
    });

    // États pour les notifications
    const [notifications, setNotifications] = useState({
        nouvelleCommande: true,
        messageClient: true,
        stockFaible: true,
        paiementRecu: true,
        emailMarketing: false
    });

    // États pour la livraison
    const [livraison, setLivraison] = useState({
        delaiTraitement: "1-2",
        zonesLivraison: ["Douala", "Yaoundé"],
        fraisLivraison: "1000",
        livraisonGratuite: "25000"
    });

    const abonnementsDisponibles = [
        { type: "Gratuit", montant: "0 FCFA", duree: "illimitée", produits: "5", commission: "15%" },
        { type: "Commission", montant: "0 FCFA + % sur ventes", duree: "illimitée", produits: "50", commission: "10%" },
        { type: "Standard", montant: "5 000 FCFA", duree: "1 mois", produits: "100", commission: "5%" },
        { type: "Premium", montant: "10 000 FCFA", duree: "1 mois", produits: "500", commission: "3%" },
        { type: "Entreprise", montant: "50 000 FCFA", duree: "1 mois", produits: "Illimité", commission: "2%" },
    ];

    const sections = [
        { id: "profil", label: "Profil Boutique", icon: Store },
        { id: "abonnement", label: "Abonnement", icon: CreditCard },
        { id: "produits", label: "Gestion Produits", icon: Settings },
        { id: "livraison", label: "Livraison", icon: Truck },
        { id: "financier", label: "Paramètres Financiers", icon: CreditCard },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "assistants", label: "Assistants", icon: User },
        { id: "securite", label: "Sécurité", icon: Shield },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
    ];

    const ajouterAssistant = () => {
        const email = prompt("Entrer l'email de l'assistant :");
        if (email) {
            setAssistants([...assistants, { 
                id: Date.now(), 
                nom: "Nouveau Assistant", 
                email,
                role: "Éditeur"
            }]);
        }
    };

    const supprimerAssistant = (id) => {
        setAssistants(assistants.filter((a) => a.id !== id));
    };

    const ajouterZoneLivraison = () => {
        const zone = prompt("Ajouter une zone de livraison :");
        if (zone) {
            setLivraison({
                ...livraison,
                zonesLivraison: [...livraison.zonesLivraison, zone]
            });
        }
    };

    const supprimerZoneLivraison = (zone) => {
        setLivraison({
            ...livraison,
            zonesLivraison: livraison.zonesLivraison.filter(z => z !== zone)
        });
    };

    const renderSection = () => {
        switch(activeSection) {
            case "profil":
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Store className="w-5 h-5 text-blue-600" />
                                Informations de la Boutique
                            </h3>
                            
                            {/* Logo de la boutique */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Logo de la boutique</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed">
                                        {profil.logo ? (
                                            <img src={profil.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                                        ) : (
                                            <Camera className="w-8 h-8 text-gray-400" />
                                        )}
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        <Upload className="w-4 h-4" />
                                        Télécharger
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Nom de la boutique</label>
                                    <input
                                        type="text"
                                        value={profil.nomBoutique}
                                        onChange={(e) => setProfil({...profil, nomBoutique: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={profil.telephone}
                                            onChange={(e) => setProfil({...profil, telephone: e.target.value})}
                                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={profil.email}
                                            onChange={(e) => setProfil({...profil, email: e.target.value})}
                                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Site Web</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type="url"
                                            value={profil.siteWeb}
                                            onChange={(e) => setProfil({...profil, siteWeb: e.target.value})}
                                            placeholder="https://monsite.com"
                                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium mb-2">Adresse complète</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <textarea
                                        value={profil.adresse}
                                        onChange={(e) => setProfil({...profil, adresse: e.target.value})}
                                        rows="2"
                                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium mb-2">Description de la boutique</label>
                                <textarea
                                    value={profil.description}
                                    onChange={(e) => setProfil({...profil, description: e.target.value})}
                                    rows="4"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Décrivez votre boutique, vos spécialités, vos valeurs..."
                                />
                            </div>
                        </div>

                        {/* Horaires d'ouverture */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Horaires d'ouverture
                            </h3>
                            <div className="grid gap-4">
                                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((jour) => (
                                    <div key={jour} className="flex items-center gap-4">
                                        <div className="w-20 text-sm font-medium">{jour}</div>
                                        <input type="time" className="p-2 border rounded-lg" defaultValue="08:00" />
                                        <span>-</span>
                                        <input type="time" className="p-2 border rounded-lg" defaultValue="18:00" />
                                        <label className="flex items-center gap-2">
                                            <input type="checkbox" className="rounded" />
                                            <span className="text-sm">Fermé</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case "abonnement":
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6">Mon abonnement actuel</h3>
                            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-lg">{abonnement}</h4>
                                        <p className="text-gray-600">Plan actuel</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {abonnementsDisponibles.find(a => a.type === abonnement)?.montant}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            par {abonnementsDisponibles.find(a => a.type === abonnement)?.duree}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-lg font-semibold mb-4">Plans disponibles</h4>
                            <div className="grid gap-4">
                                {abonnementsDisponibles.map((plan, index) => (
                                    <div 
                                        key={index} 
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                            abonnement === plan.type 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setAbonnement(plan.type)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h5 className="font-semibold">{plan.type}</h5>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {plan.produits} produits • Commission {plan.commission}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold">{plan.montant}</div>
                                                <div className="text-sm text-gray-500">/ {plan.duree}</div>
                                            </div>
                                        </div>
                                        {abonnement === plan.type && (
                                            <div className="mt-2 flex items-center gap-1 text-blue-600 text-sm">
                                                <Check className="w-4 h-4" />
                                                Plan actuel
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case "produits":
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6">Gestion des produits</h3>
                            
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={gererStock}
                                        onChange={() => setGererStock(!gererStock)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <div>
                                        <div className="font-medium">Gérer le stock automatiquement</div>
                                        <div className="text-sm text-gray-500">Le stock sera mis à jour automatiquement après chaque vente</div>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                                    <div>
                                        <div className="font-medium">Alertes stock faible</div>
                                        <div className="text-sm text-gray-500">Recevoir une alerte quand le stock est bas</div>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                                    <div>
                                        <div className="font-medium">Publication automatique</div>
                                        <div className="text-sm text-gray-500">Publier automatiquement les nouveaux produits</div>
                                    </div>
                                </label>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium mb-2">Seuil d'alerte stock</label>
                                <input
                                    type="number"
                                    defaultValue="5"
                                    className="w-full max-w-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-sm text-gray-500 mt-1">Recevoir une alerte quand le stock est inférieur à ce nombre</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4">Gestion des discussions</h3>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                                    <span>Discuter sur WhatsApp</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                                    <span>Discuter sur WandaMarket</span>
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case "livraison":
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6">Paramètres de livraison</h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Délai de traitement</label>
                                    <select
                                        value={livraison.delaiTraitement}
                                        onChange={(e) => setLivraison({...livraison, delaiTraitement: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="1">1 jour</option>
                                        <option value="1-2">1-2 jours</option>
                                        <option value="2-3">2-3 jours</option>
                                        <option value="3-5">3-5 jours</option>
                                        <option value="5-7">5-7 jours</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Frais de livraison (FCFA)</label>
                                    <input
                                        type="number"
                                        value={livraison.fraisLivraison}
                                        onChange={(e) => setLivraison({...livraison, fraisLivraison: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium mb-2">Livraison gratuite à partir de (FCFA)</label>
                                <input
                                    type="number"
                                    value={livraison.livraisonGratuite}
                                    onChange={(e) => setLivraison({...livraison, livraisonGratuite: e.target.value})}
                                    className="w-full max-w-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-sm font-medium">Zones de livraison</label>
                                    <button 
                                        onClick={ajouterZoneLivraison}
                                        className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Ajouter zone
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {livraison.zonesLivraison.map((zone, index) => (
                                        <span 
                                            key={index} 
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                        >
                                            {zone}
                                            <button
                                                onClick={() => supprimerZoneLivraison(zone)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "financier":
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6">Informations bancaires</h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Nom de la banque</label>
                                    <select
                                        value={compteBancaire.banque}
                                        onChange={(e) => setCompteBancaire({...compteBancaire, banque: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Sélectionner une banque</option>
                                        <option value="Ecobank">Ecobank</option>
                                        <option value="UBA">UBA</option>
                                        <option value="Afriland">Afriland First Bank</option>
                                        <option value="BICEC">BICEC</option>
                                        <option value="CCA">CCA Bank</option>
                                        <option value="SCB">SCB Cameroun</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Numéro de compte</label>
                                    <input
                                        type="text"
                                        value={compteBancaire.numeroCompte}
                                        onChange={(e) => setCompteBancaire({...compteBancaire, numeroCompte: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ex: 123456789012"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Nom du titulaire</label>
                                    <input
                                        type="text"
                                        value={compteBancaire.nomTitulaire}
                                        onChange={(e) => setCompteBancaire({...compteBancaire, nomTitulaire: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Mobile Money</label>
                                    <input
                                        type="tel"
                                        value={compteBancaire.mobile}
                                        onChange={(e) => setCompteBancaire({...compteBancaire, mobile: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="+237 6XX XXX XXX"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4">Résumé financier</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-green-600 text-sm font-medium">Revenus ce mois</div>
                                    <div className="text-2xl font-bold text-green-700">125 000 FCFA</div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="text-blue-600 text-sm font-medium">Commissions</div>
                                    <div className="text-2xl font-bold text-blue-700">12 500 FCFA</div>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <div className="text-orange-600 text-sm font-medium">En attente</div>
                                    <div className="text-2xl font-bold text-orange-700">25 000 FCFA</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "notifications":
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-xl font-semibold mb-6">Préférences de notification</h3>
                        
                        <div className="space-y-4">
                            {Object.entries(notifications).map(([key, value]) => {
                                const labels = {
                                    nouvelleCommande: { title: "Nouvelle commande", desc: "Être notifié lors d'une nouvelle commande" },
                                    messageClient: { title: "Message client", desc: "Recevoir les messages des clients" },
                                    stockFaible: { title: "Stock faible", desc: "Alerte quand le stock est bas" },
                                    paiementRecu: { title: "Paiement reçu", desc: "Confirmation de réception de paiement" },
                                    emailMarketing: { title: "Emails marketing", desc: "Recevoir les newsletters et promotions" }
                                };
                                
                                return (
                                    <label key={key} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={() => setNotifications({...notifications, [key]: !value})}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <div>
                                            <div className="font-medium">{labels[key].title}</div>
                                            <div className="text-sm text-gray-500">{labels[key].desc}</div>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>

                        <div className="mt-6 pt-6 border-t">
                            <h4 className="font-semibold mb-4">Canaux de notification</h4>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                                    <span>Email</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                                    <span>SMS</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                                    <span>Notification Push</span>
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case "assistants":
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-xl font-semibold mb-6">Gestion des assistants</h3>
                        
                        <div className="space-y-4 mb-6">
                            {assistants.map((assistant) => (
                                <div key={assistant.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{assistant.nom}</div>
                                            <div className="text-sm text-gray-500">{assistant.email}</div>
                                            <div className="text-xs text-blue-600">{assistant.role}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select 
                                            value={assistant.role}
                                            onChange={(e) => {
                                                setAssistants(assistants.map(a => 
                                                    a.id === assistant.id ? {...a, role: e.target.value} : a
                                                ));
                                            }}
                                            className="text-sm border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="Éditeur">Éditeur</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Lecture seule">Lecture seule</option>
                                        </select>
                                        <button
                                            className="text-red-500 hover:text-red-700 p-2"
                                            onClick={() => supprimerAssistant(assistant.id)}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={ajouterAssistant}
                        >
                            <Plus className="w-4 h-4" />
                            Ajouter un assistant
                        </button>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold mb-2">Rôles et permissions</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div><strong>Admin :</strong> Accès complet à tous les paramètres</div>
                                <div><strong>Éditeur :</strong> Peut gérer les produits et commandes</div>
                                <div><strong>Lecture seule :</strong> Peut seulement consulter les données</div>
                            </div>
                        </div>
                    </div>
                );

            case "securite":
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6">Sécurité du compte</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Mot de passe actuel</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
                                            placeholder="Entrez votre mot de passe actuel"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nouveau mot de passe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Confirmer le nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Confirmer le mot de passe"
                                    />
                                </div>

                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Changer le mot de passe
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4">Authentification à deux facteurs (2FA)</h3>
                            
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <div className="font-medium">Authentification à deux facteurs</div>
                                    <div className="text-sm text-gray-500">Ajoutez une couche de sécurité supplémentaire</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4">Documents de vérification</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <div className="font-medium">Registre de Commerce (RCCM)</div>
                                        <div className="text-sm text-gray-500">Statut : Non vérifié</div>
                                    </div>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        Télécharger
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <div className="font-medium">Pièce d'identité</div>
                                        <div className="text-sm text-green-600">Statut : Vérifié</div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                        Vérifié
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "analytics":
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6">Statistiques de performance</h3>
                            
                            <div className="grid md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="text-blue-600 text-sm font-medium">Vues ce mois</div>
                                    <div className="text-2xl font-bold text-blue-700">2,485</div>
                                    <div className="text-sm text-green-600">+12% vs mois dernier</div>
                                </div>
                                
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-green-600 text-sm font-medium">Commandes</div>
                                    <div className="text-2xl font-bold text-green-700">156</div>
                                    <div className="text-sm text-green-600">+8% vs mois dernier</div>
                                </div>
                                
                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <div className="text-orange-600 text-sm font-medium">Taux conversion</div>
                                    <div className="text-2xl font-bold text-orange-700">6.3%</div>
                                    <div className="text-sm text-red-600">-2% vs mois dernier</div>
                                </div>
                                
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="text-purple-600 text-sm font-medium">Note moyenne</div>
                                    <div className="text-2xl font-bold text-purple-700">4.8</div>
                                    <div className="text-sm text-green-600">+0.2 vs mois dernier</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4">Produits les plus performants</h3>
                            
                            <div className="space-y-4">
                                {[
                                    { nom: "Smartphone Samsung Galaxy", ventes: 45, revenus: "450,000 FCFA" },
                                    { nom: "Casque Audio Bluetooth", ventes: 32, revenus: "320,000 FCFA" },
                                    { nom: "Chaussures de sport Nike", ventes: 28, revenus: "280,000 FCFA" }
                                ].map((produit, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <div className="font-medium">{produit.nom}</div>
                                            <div className="text-sm text-gray-500">{produit.ventes} ventes</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold">{produit.revenus}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4">Paramètres des rapports</h3>
                            
                            <div className="space-y-4">
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                                    <span>Recevoir un rapport hebdomadaire par email</span>
                                </label>
                                
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                                    <span>Rapport mensuel détaillé</span>
                                </label>
                                
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                                    <span>Alertes de performance</span>
                                </label>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Paramètres Vendeur</h1>
                    <p className="text-gray-600">Gérez les paramètres de votre boutique</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex gap-6">
                    {/* Sidebar Navigation */}
                    <div className="w-80 bg-white rounded-xl shadow-sm border p-6 h-fit">
                        <nav className="space-y-2">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                            activeSection === section.id
                                                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {section.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {renderSection()}
                        
                        {/* Save Button */}
                        <div className="mt-8 flex justify-end">
                            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Save className="w-4 h-4" />
                                Enregistrer les modifications
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerSettings;