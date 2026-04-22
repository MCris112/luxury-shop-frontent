'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/app/(shop)/CartProvider';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const CartSidebar = () => {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart } = useCart();

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsCartOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setIsCartOpen]);

    // Prevent scrolling when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isCartOpen]);

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-background/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <aside 
                className={`fixed top-0 right-0 h-full w-full max-w-[450px] bg-background border-l border-foreground/5 z-[101] transition-transform duration-700 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-8 py-8 border-b border-foreground/5">
                        <div className="flex items-center gap-3">
                            <ShoppingBag size={18} className="text-accent" />
                            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold">Tu Bolsa</h2>
                        </div>
                        <button 
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 hover:text-accent transition-colors duration-300"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">
                        {cart.items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <p className="font-serif italic text-xl text-muted-fg mb-6">Tu bolsa está vacía</p>
                                <button 
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent hover:underline"
                                >
                                    Continuar Comprando
                                </button>
                            </div>
                        ) : (
                            cart.items.map((item) => (
                                <div key={item.product.id} className="flex gap-6 group">
                                    <div className="relative h-24 w-24 bg-muted-bg flex-shrink-0">
                                        <Image 
                                            src={item.product.image} 
                                            alt={item.product.name}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-sm font-serif">{item.product.name}</h3>
                                                <button 
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-muted-fg hover:text-accent transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-muted-fg uppercase tracking-widest">
                                                Cant. {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-xs font-medium">
                                            {item.product.price}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cart.items.length > 0 && (
                        <div className="px-8 py-10 border-t border-foreground/5 bg-muted-bg/30">
                            <div className="flex justify-between items-end mb-8">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-fg">Subtotal</span>
                                <span className="text-2xl font-serif">
                                    ${cart.total.toLocaleString()}
                                </span>
                            </div>
                            
                            <Link 
                                href="/checkout"
                                onClick={() => setIsCartOpen(false)}
                                className="block w-full bg-foreground text-background text-center py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-accent transition-colors duration-500"
                            >
                                Proceder al Pago
                            </Link>
                        </div>
                    )}
                </div>
            </aside>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.05);
                }
            `}</style>
        </>
    );
};
