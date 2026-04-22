'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../(main)/products/product.types';
import { CartItem, Cart } from './shop.types';

// Define the context shape
interface CartContextType {
    cart: Cart;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    totalItems: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('luxury-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to load cart", e);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('luxury-cart', JSON.stringify(items));
    }, [items]);

    // Add a product to the cart
    const addToCart = (product: Product) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === product.id);
            
            if (existingItem) {
                return prevItems.map(item => 
                    item.product.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            
            return [...prevItems, { product, quantity: 1 }];
        });
        
        // Open the cart automatically when an item is added
        setIsCartOpen(true);
    };

    // Remove a product from the cart completely
    const removeFromCart = (productId: string) => {
        setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    };

    // Clear all items
    const clearCart = () => {
        setItems([]);
    };
    const total = items.reduce((sum, item) => {
        const price = Number(item.product.price.toString().replace(/[^0-9.]/g, ''));
        return sum + (price * item.quantity);
    }, 0);

    // Calculate total item count
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cart: { items, total }, 
            addToCart, 
            removeFromCart, 
            clearCart,
            totalItems,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Simple hook to use the cart anywhere
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
