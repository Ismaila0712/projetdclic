import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        if (!user) {
            setCartItems([]);
            setTotal(0);
            setItemCount(0);
            return;
        }
        setLoading(true);
        try {
            const response = await api.get('/cart');
            setCartItems(response.data.items || []);
            setTotal(response.data.total || 0);
            setItemCount(response.data.items?.length || 0);
        } catch (error) {
            console.error('Erreur chargement panier:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            await api.post('/cart/add', { product_id: productId, quantity });
            await fetchCart();
        } catch (error) {
            console.error('Erreur ajout panier:', error);
            throw error;
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            await api.put(`/cart/update/${productId}`, { quantity });
            await fetchCart();
        } catch (error) {
            console.error('Erreur mise à jour panier:', error);
            throw error;
        }
    };

    const removeItem = async (productId) => {
        try {
            await api.delete(`/cart/remove/${productId}`);
            await fetchCart();
        } catch (error) {
            console.error('Erreur suppression:', error);
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            await api.delete('/cart/clear');
            await fetchCart();
        } catch (error) {
            console.error('Erreur vidage panier:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    return (
        <CartContext.Provider value={{
            cartItems,
            total,
            itemCount,
            loading,
            fetchCart,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};