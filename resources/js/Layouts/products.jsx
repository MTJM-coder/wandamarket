import React, { useState, useEffect } from 'react';
import { FaStore } from 'react-icons/fa';
import { FiStar, FiMapPin, FiShoppingCart, FiHeart} from 'react-icons/fi';

const Products = ({ filters, searchTerm }) => {
    const showMore =(id)=>{
        
        window.location.href="/detail-product"
    }
    const [likedProduct, setLikedProduct] = useState([]);

    const toggleLike = (id) => {
        setLikedProduct((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        const saved = localStorage.getItem('likedProduct');
        if (saved) setLikedProduct(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('likedProduct', JSON.stringify(likedProduct));
    }, [likedProduct]);

    const productList = [
        {
            id: 1,
            name: 'Sac à main',
            category: 'Mode',
            price: '100 000 FCFA',
            oldPrice: '120 000 FCFA',
            description:
                'Sac à main en cuir véritable léger et facilement portable pour tout vos déplacements',
            seller: 'Leon Marchand',
            location: 'Douala',
            rating: 2.8,
            imageUrl: '/sac1.webp',
        },
        {
            id: 2,
            name: 'Chaussures de sortie',
            category: 'Mode',
            price: '45 000 FCFA',
            oldPrice: '50 000 FCFA',
            description: 'Chaussures élégantes pour les sorties',
            seller: 'Marie le pan',
            location: 'Yaoundé',
            rating: 4.5,
            imageUrl: '/shoes.png',
        },
        {
            id: 3,
            name: 'Montre de luxe',
            category: 'Accessoires',
            price: '75 000 FCFA',
            oldPrice: '90 000 FCFA',
            description: 'Montre de luxe avec bracelet en cuir',
            seller: 'Maguida',
            location: 'Buea',
            rating: 4.0,
            imageUrl: '/wach.png',
        },
        {
            id: 4,
            name: 'Costume homme',
            category: 'Mode',
            price: '150 000 FCFA',
            oldPrice: '180 000 FCFA',
            description: 'Costume élégant pour les occasions spéciales',
            seller: 'Bemji Shop',
            location: 'Douala',
            rating: 4.2,
            imageUrl: '/dressMen.png',
        },
        {
            id: 5,
            name: 'Robe pagne elegante',
            category: 'Mode',
            price: '80 000 FCFA',
            oldPrice: '100 000 FCFA',
            description: 'Robe en pagne pour les occasions spéciales',
            seller: 'Boutique du nouveau',
            location: 'Yaoundé',
            rating: 4.3,
            imageUrl: '/dressGirl.png',
        },
        {
            id: 6,
            name: 'Iphone 14 Pro',
            category: 'Electronique',
            price: '1 200 000 FCFA',
            oldPrice: '1 500 000 FCFA',
            description: 'Iphone 14 Pro avec 256 Go de stockage',
            seller: 'Best Choice Store',
            location: 'Douala',
            rating: 4.8,
            imageUrl: '/phone.png',
        },
        {
            id: 7,
            name: 'Ordinateur portable',
            category: 'Electronique',
            price: '500 000 FCFA',
            oldPrice: '600 000 FCFA',
            description: 'Ordinateur portable avec 16 Go de RAM et 512 Go de SSD ',
            seller: 'Tech World',
            location: 'Yaoundé',
            rating: 4.6,
            imageUrl: '/machine.png',
        },
        {
            id: 8,
            name: 'Sac à dos en cuir',
            category: 'Mode',
            price: '120 000 FCFA',
            oldPrice: '150 000 FCFA',
            // description:
                // 'Sac à dos en cuir véritable pour les étudiants et professionnels',
            seller: 'Bag Store',
            location: 'Douala',
            rating: 4.1,
            imageUrl: '/sac2.webp',
        },
    ];

    const filteredProducts = productList.filter((product) => {
        const matchCity =
            filters.city.length === 0 ||
            filters.city.includes("Toutes les villes") ||
            filters.city.includes(product.location);
        const matchCategory =
            filters.category.length === 0 ||
            filters.category.includes("Toutes catégories") ||
            filters.category.includes(product.category);
        const priceValue = parseInt(product.price.replace(/\D/g, ''));
        const matchPrice =
            priceValue >= filters.minPrice && priceValue <= filters.maxPrice;
        const matchRating = filters.rating
            ? product.rating >= filters.rating
            : true;
        const matchSearch = searchTerm
            ? (
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.seller.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : true;

        return (
            matchCity &&
            matchCategory &&
            matchPrice &&
            matchRating &&
            matchSearch
        );
    });

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {filteredProducts.map((product) => {
                const isLiked = likedProduct.includes(product.id);
                return (
                    <div
                        className="bg-white rounded shadow-sm p-3 hover:shadow-lg transition-shadow duration-300"
                        key={product.id}
                        onClick={()=>showMore(product.id)}
                    >
                        <div
                            className="relative bg-cover bg-center h-24 w-full rounded-lg mb-4 cursor-pointer"
                            style={{ backgroundImage: `url(${product.imageUrl})` }}
                        >
                            <FiHeart
                            
                                onClick={(e) =>{
                                    e.stopPropagation();
                                    toggleLike(product.id);
                                    }
                                }
                                className={`absolute top-2 right-2 text-bold p-2 rounded-full text-3xl shadow-md cursor-pointer hover:scale-110 transition-transform duration-300 ${isLiked ? 'bg-orange-500 text-lime-50' : 'bg-white'
                                    }`}
                            />
                        </div>
                        <div className=" flex items-center justify-between">
                            <h2 className="md:text-md  text-sm font-semibold">{product.name}</h2>
                            {/* <div className="flex items-center text-sm text-gray-700">
                                <FiStar className="text-orange-500 mr-1" />
                                {product.rating}/5
                            </div> */}
                        </div>
                        <p className={`text-gray-500 w-full  overflow-hidden text-[10px] ${product.description?"h-7":""}`}>
                            {product.description}
                        </p>
                        <p className="md:text-md text-sm font-bold">{product.price}</p>
                        <p className="line-through text-[10px] text-red-500">{product.oldPrice}</p>
                        <p className="font-serif text-xs  mt-2 text-gray-300 flex items-center gap-1">
                            <FaStore/>
                            <i>{product.seller}</i>
                        </p>
                        {/* <p className="mt-1">
                            <FiMapPin className="inline" /> {product.location}
                        </p> */}
                        {/* <div className="flex justify-between items-center mt-2">
                            <button className="border-2 p-3 rounded-2xl bg-orange-400 hover:bg-transparent transition-all duration-500 ease-in-out">
                                <FiShoppingCart className="inline mr-1" />
                                Ajouter
                            </button>
                            <button className="border-2 p-3 rounded-2xl bg-orange-400 hover:bg-transparent transition-all duration-500 ease-in-out">
                                Discuter
                            </button>
                        </div> */}
                    </div>
                );
            })}
        </div>
    );
};

export default Products;
