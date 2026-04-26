'use client';

import { useEffect } from 'react';
import { useCart } from '@/app/(shop)/CartProvider';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
    const { clearCart } = useCart();
    const searchParams = useSearchParams();
    
    // We get some info from Mercado Pago URL params
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');

    useEffect(() => {
        // Clear the cart when the user reaches the success page
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-8 bg-background">
            <div className="max-w-2xl w-full text-center space-y-12">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-150 animate-pulse" />
                        <CheckCircle2 size={120} strokeWidth={1} className="text-accent relative z-10" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-7xl font-serif tracking-tight">Pago <span className="italic">Confirmado</span></h1>
                    <p className="text-muted-fg uppercase tracking-[0.3em] text-xs">Su pedido ha sido procesado con éxito</p>
                </div>

                <div className="bg-muted-bg/30 p-10 border border-foreground/5 space-y-6">
                    <p className="font-serif italic text-xl text-foreground">
                        "La verdadera elegancia no es destacar, sino ser recordado."
                    </p>
                    
                    <div className="pt-6 border-t border-foreground/10 flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-muted-fg">ID de Transacción</span>
                        <span className="font-mono text-xs">{paymentId || 'PND-XXXX-XXXX'}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row justify-center gap-8 pt-8">
                    <Link 
                        href="/products" 
                        className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold py-5 px-10 border border-foreground hover:bg-foreground hover:text-background transition-all duration-500"
                    >
                        Seguir Comprando
                        <ShoppingBag size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link 
                        href="/" 
                        className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold py-5 px-10 bg-accent text-background hover:bg-foreground transition-all duration-500"
                    >
                        Volver al Inicio
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <p className="text-[10px] text-muted-fg leading-relaxed max-w-sm mx-auto">
                    Recibirá un correo electrónico con los detalles de su pedido y el número de seguimiento en breve. 
                    Gracias por elegir <span className="text-foreground font-medium">LUXURY</span>.
                </p>
            </div>
        </div>
    );
}
