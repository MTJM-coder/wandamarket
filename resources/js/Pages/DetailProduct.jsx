import React, { useState, useEffect } from 'react'
import NavBar2 from '@/Layouts/NavBar2'
import { FiChevronLeft, FiChevronRight, FiMessageSquare, FiShoppingCart, FiPackage, FiX, FiCheck } from 'react-icons/fi'
import Footer from '@/Layouts/footer'
import AddCart  from '@/Pages/AddCart'
const DetailProduct = ({product}) => {
    const images = [
        "/sac1.webp",
        "/sac2.webp",
        "/shoes.png",
        "/sac1.webp"
    ]

const [isInCart,setIsInCart]=useState([]);

// const addCart


    const [alertAddCart, setAlertAddCart] = useState(false)
    useEffect(() => {
        if (alertAddCart) {
            const timer = setTimeout(() => {
                setAlertAddCart(false);
            }, 2000); 
            return () => clearTimeout(timer); // Nettoyage si le composant est démonté
        }
    }, [alertAddCart]);

    const [number, setNumber] = useState(0)
    const handleCommander = () => {
        // setNumber(number + 1)
        alert("Produit ajouté au panier")
    }

    const [isColor, setIscolor] = useState(false)
    const [isSize, setIsSize] = useState(false)
    const prix = 10000

    const similarProduct = [
        {
            id: 1,
            name: "Sac de luxe",
            Description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, fuga.",
            localisation: "Douala",
            imageUrl: '/sac1.webp',
            prix: "10000 FCFA"
        },
        {
            id: 2,
            name: "Sac à main",
            Description: "Lorem ipsum dolor sit amet.",
            localisation: "Bafoussam",
            imageUrl: '/sac2.webp',
            prix: "10000 FCFA"
        },
        {
            id: 3,
            name: "Montre de luxe",
            Description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
            localisation: "Bafoussam",
            imageUrl: '/wach.png',
            prix: "10000 FCFA"
        },
        {
            id: 4,
            name: "Shoes men",
            Description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, porro.",
            localisation: "Dschang",
            imageUrl: "/shoes.png",
            prix: "10000 FCFA"
        }
    ]
    
    const  products=[
        {
        id:1,
        nom:"banane",
        prix:10000
        }
    ]

    const Commentaires = [
        {
            id: 1,
            user: "Sigmund Freud",
            rating: 4,
            comment: "Très bon produit, je suis satisfait de mon achat.",
            date: "2023-10-01",
            imageUrl: "/sac1.webp"
        },
        {
            id: 2,
            user: "Marie Curie",
            rating: 5,
            comment: "Excellent produit, de très bonne qualité !",
            date: "2023-10-02",
            imageUrl: "/sac2.webp"
        },
        {
            id: 3,

            user: "Albert Einstein",
            rating: 3,
            comment: "Produit correct, mais j'attendais mieux.",
            date: "2023-10-03"
            // imageUrl: "/wach.png"
        },
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    }

    const [showRubanOrder, setShowRubanOrder] = useState(false)
    const [addQuantity, setAddQuantity] = useState(1)

    // ajout et stockage dans le panier
    const { cart, addToCart } = AddCart();
    const handleAddToCart = () => {
        const productToAdd = {
            id: 1,
            name: "bonjour",
            imageUrl: images[currentIndex],
            price: "10000",
            quantity: addQuantity
        };
        addToCart(productToAdd);
        
    }
        return (
            <>
                <NavBar2
                    number={cart.length}
                    // setNumber={setNumber}
                />
                {alertAddCart && (
                    <div
                        className="fixed bottom-50 right-4 bg-green-500 text-white p-5 rounded-lg items-center flex justify-center shadow-lg z-50 animate-fadeIn"
                        style={{ animation: 'fadeIn 0.5s, fadeOut 0.5s 2.5s forwards' }}
                    >
                        <div className='inline-flex items-center gap-2 w-7 h-7 justify-center bg-white rounded-full text-green-500 mr-5'>
                            <FiCheck size={24} />
                        </div>
                        <span>Produit Ajouté au panier</span>
                    </div>
                )}
                <div className="mt-16 md:p-6 py-6 px-2 max-w-7xl mx-auto">

                    {/* Titre */}
                    <h1 className="text-2xl font-bold mb-8">Détails du produit</h1>

                    <div className="flex flex-col md:flex-row gap-8">

                        {/* Miniatures */}
                        <div className="flex md:flex-col gap-4">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`p-1 border rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${currentIndex === index ? 'border-orange-500' : 'border-gray-300'
                                        }`}
                                    onClick={() => setCurrentIndex(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`Miniature ${index + 1}`}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Image principale */}
                        <div className="flex items-center md:gap-4 bg-gray-100 p-4 rounded-lg">
                            <FiChevronLeft
                                className="text-3xl cursor-pointer hover:text-orange-500 transition-colors"
                                onClick={handlePrev}
                            />
                            <img
                                src={images[currentIndex]}
                                alt="Produit"
                                className="md:w-[400px] w-[300px] md:h-[400px] h-[300px] object-cover rounded-lg"
                            />
                            <FiChevronRight
                                className="text-3xl cursor-pointer hover:text-orange-500 transition-colors"
                                onClick={handleNext}
                            />
                        </div>

                        {/* Infos produit */}
                        <div className="flex-1 md:text-inherit text-xs">
                            <h2 className="text-xl font-semibold mb-2">
                                Nom du produit <span className="text-gray-500">— <i>Nom de la boutique</i></span>
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Ceci est une description détaillée du produit. Elle met en avant ses caractéristiques principales et ce qui le rend unique.
                            </p>
                            <p className="md:text-lg text-sm font-bold mb-2">Ville : <span className="text-gray-800">Douala</span></p>
                            <p className="md:text-lg text-sm font-bold text-orange-600 mb-4">Prix : 1000 FCFA</p>

                            {/* Notes */}
                            <div className="flex items-center gap-2 mb-4">
                                <span>Notes :</span>
                                <span className="text-yellow-500">★★★★☆</span>
                                <span className="text-gray-600">(4.5)</span>
                            </div>

                            {/* Couleurs */}
                            <div className="mb-4">
                                <span className="font-medium">Couleurs disponibles :</span>
                                <div className="flex gap-2 mt-2">
                                    <span className="w-6 h-6 bg-red-500 rounded-full border cursor-pointer"></span>
                                    <span className="w-6 h-6 bg-blue-500 rounded-full border cursor-pointer"></span>
                                    <span className="w-6 h-6 bg-green-500 rounded-full border cursor-pointer"></span>
                                </div>
                            </div>

                            {/* Boutons */}
                            <div className="flex flex-wrap gap-3 mt-6">
                                <button className="flex items-center gap-2 border-black border-2 px-6 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
                                    onClick={() => setShowRubanOrder(true)

                                    }
                                >
                                    <FiShoppingCart /> Ajouter au panier
                                </button>
                                <button className="flex items-center gap-2 border-black border-2 px-6 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition-colors"

                                >
                                    <FiPackage /> Commander
                                </button>
                                <button className="flex items-center gap-2 border-black border-2 px-6 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition-colors">
                                    <FiMessageSquare /> Discuter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Produits similaires et avis */}
                    <h2 className="mt-20 md:text-3xl font-extrabold">Produits similaires, avis et recommandations</h2>
                    <div className="flex md:flex-row flex-col-reverse mt-10 md:gap-6">

                        {/* Produits similaires */}
                        
                        <div className="md:w-1/2 md:p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-1">
                            
                            {similarProduct.map((item) => (
                                <div key={item.id} className="p-4 border rounded-lg  transition cursor-pointer">
                                    <div
                                        className="bg-cover bg-center rounded-lg h-32"
                                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                                    ></div>
                                    <p className="mt-4 font-bold text-lg">{item.name}</p>
                                    <p className="text-sm text-gray-600 h-16 overflow-hidden">{item.Description}</p>
                                    <p className="font-bold text-orange-600 mt-2">{item.prix}</p>
                                </div>
                            ))}
                        </div>

                        {/* Avis */}
                        <div className="md:w-1/2 bg-gray-100 rounded-lg md:p-6 p-1">
                            <h1 className="font-extrabold text-2xl mb-4">Notes et Commentaires</h1>
                            <div className="flex justify-between items-center mb-4">
                                <button className="px-3 py-1  border-black font-bold border-2  rounded-[15px] hover:bg-orange-500 hover:text-white transition">Tous</button>
                                <button className="px-3 py-1 border border-black rounded-[15px] hover:bg-orange-500 hover:text-white transition">Avec Photos</button>
                                <select className="border rounded-[15px] px-2 py-1">
                                    <option>notes</option>
                                    <option>5 étoiles</option>
                                    <option>4 étoiles</option>
                                    <option>3 étoiles</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                {Commentaires.map((comment) => (
                                    <div key={comment.id} className="flex items-start gap-4">


                                        <div>
                                            <h3 className="font-bold">{comment.user}</h3>
                                            <p className="text-yellow-500">{"★".repeat(comment.rating)}{"☆".repeat(5 - comment.rating)}</p>
                                            <p className="text-gray-700">{comment.comment}</p>
                                            {comment.imageUrl && (
                                                <img
                                                    src={comment.imageUrl}
                                                    alt={comment.user}
                                                    className="w-12 h-12 rounded-full"
                                                />
                                            )}
                                            <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {showRubanOrder && (
                        <div className='mt-20 bg-white shadow-md p-6 rounded-lg md:w-[50%] w-[100%] index-1000 fixed right-0 top-0'>
                            <FiX className='text-2xl cursor-pointer bg-slate-300 absolute top-2 right-2'
                                onClick={() => setShowRubanOrder(false)}
                            />
                            <h1 className='text-2xl font-bold mb-10'>Choisissez la quantité et les variations</h1>
                            <h1 className='text-xl font-bold mb-4'>{prix}0 FCFA</h1>
                            <hr />
                            <div className='flex justify-between items-center mt-4'>
                                <div>
                                    <img src="/sac1.webp" alt="" className='w-20 h-20 rounded mb-5 border-2 border-black' />
                                    <p>Sac a main</p>
                                </div>
                                <div>
                                    <p className='mb-2'>quantité</p>
                                    <div className='flex items-center gap-2'>
                                        <button className='border border-black px-3 py-1 rounded-lg hover:bg-orange-500 hover:text-white transition'
                                            onClick={() => setAddQuantity(addQuantity > 1 ? addQuantity - 1 : 1)}
                                        >-</button>
                                        <span className='text-xl font-bold'>{addQuantity}</span>
                                        <button className='border border-black px-3 py-1 rounded-lg hover:bg-orange-500 hover:text-white transition'
                                            onClick={() => setAddQuantity(addQuantity + 1)}
                                        >+</button>
                                    </div>
                                </div>

                            </div>
                            {(isColor || isSize) && (
                                <div>
                                    <p className='mb-2 text-center'>Variations</p>
                                    <div className='flex items-center gap-4 text-center justify-center mb-4'>
                                        {isColor && (<select className='border border-black px-10 py-1 rounded-lg  transition'>
                                            <option>Couleur</option>
                                            <option>Rouge</option>
                                            <option>Bleu</option>
                                            <option>Vert</option>
                                        </select>
                                        )}
                                        {isSize && (
                                            <select className='border border-black px-7 py-1 rounded-lg   transition'>
                                                <option>Taille</option>
                                                <option>S</option>
                                                <option>M</option>
                                                <option>L</option>
                                            </select>
                                        )}
                                    </div>
                                </div>
                            )}
                            <hr />
                            <div className='flex justify-between items-center mt-4'>
                                <p>Total</p>
                                <p className=''>{addQuantity * prix} FCFA</p>
                            </div>
                            <div>
                                <button className='bg-orange-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-orange-600 transition w-full '
                                    onClick={() => {
                                        // setNumber(number + 1);
                                        setAlertAddCart(true);
                                        setShowRubanOrder(false);
                                         handleAddToCart();
                                    }}
                                >
                                    <FiShoppingCart className='inline mr-2' /> Ajouter au panier
                                </button>
                            </div>

                        </div>
                    )}
                </div>
                <Footer />
            </>
        )
}
export default DetailProduct
