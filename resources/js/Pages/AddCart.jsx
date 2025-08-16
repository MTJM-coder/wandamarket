 import  { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
 
 const AddCart = () => {
        const [cart, setCart] = useState(() => {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : []
        });

        useEffect(() => {
            localStorage.setItem('cart', JSON.stringify(cart));
        }, [cart]);

        const addToCart = (product) => {
            setCart((prevCart) => [...prevCart, product])
        }
         return { cart, addToCart };
    }
    export default AddCart;
