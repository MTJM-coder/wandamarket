import produits from '@/Pages/produits';
import { router, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { FaMapPin, FaStore } from 'react-icons/fa';
import { FiStar, FiMapPin, FiShoppingCart, FiHeart, FiShoppingBag} from 'react-icons/fi';

const Products = ({ filters, searchTerm ,productList }) => {
    console.log('venan de produc '+ productList.length)
    console.log(productList)
    const {props}=usePage();
    const auth=props.auth
    const showMore =(id)=>{
        
        window.location.href=`/detail-product/${id}`
    }
    const [likedProduct, setLikedProduct] = useState([]);

    const toggleLike = (id) => {
        setLikedProduct((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
        if(auth.user){
            router.get(`/favoris/${id}/add`)
        }
        
    };

    useEffect(() => {
        const saved = localStorage.getItem('likedProduct');
        if (saved) setLikedProduct(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('likedProduct', JSON.stringify(likedProduct));
    }, [likedProduct]);



    const filteredProducts = productList.filter((product) => {
        const matchCity =
            filters.city.length === 0 ||
            filters.city.includes("Toutes les villes") ||
            filters.city.includes(product.boutique.ville);
        const matchCategory =
            filters.category.length === 0 ||
            filters.category.includes("Toutes catégories") ||
            filters.category.includes(product.categorie.nom);
        const priceValue = parseInt(product.prix.replace(/\D/g, ''));
        // const matchPrice =
        //     priceValue >= filters.minPrice && priceValue <= filters.maxPrice;
        const matchRating = filters.rating
            ? product.rating >= filters.rating
            : true;
        const matchSearch = searchTerm
            ? (
                product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.categorie.nom && product.categorie.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.boutique.user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 product.boutique.nom.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : true;

        return (
            matchCity &&
            matchCategory &&
            // matchPrice &&
            matchRating &&
            matchSearch
        );
    });
console.log(filteredProducts)
    return (
        <>
        {filteredProducts.length>0 ? 
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
                            style={{ backgroundImage: `url(/storage/${product.images[0].url})` }}
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
                            <h2 className="md:text-md  text-sm font-semibold">{product.nom}</h2>
                            {/* <div className="flex items-center text-sm text-gray-700">
                                <FiStar className="text-orange-500 mr-1" />
                                {product.rating}/5
                            </div> */}
                        </div>
                        <p className={`text-gray-500 w-full  overflow-hidden text-[10px] ${product.description?"h-7":""}`}>
                            {product.description}
                        </p>
                        <p className="md:text-md text-sm font-bold">{product.prix} FCFA</p>
                        <p className="line-through text-[10px] text-red-500">{product.prix_reduit?product.prix_reduit+'FCFA':''} </p>
                        <p className="font-serif text-xs  mt-2 text-gray-300 flex items-center gap-1">
                            <FiMapPin/>
                            <i>{product?.boutique?.user?.ville}</i>
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
        </div>:
        <div className='flex items-center text-gray-300 justify-center flex-col text-center'>
            <div className='h-15 w-15 text-center bg-gray-200  my-5 p-6 rounded-full'>
                <FiShoppingBag className='text-6xl'/>
            </div>
            <div className='font-bold text-2xl'>
                Aucun article disponible 😓
            </div>

        </div>
        }
        </>
    );
};

export default Products;
