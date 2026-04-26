'use client';

import Link from 'next/link';
import { AlertCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-8 bg-background">
            <div className="max-w-2xl w-full text-center space-y-12">
                {/* Error Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full scale-150 animate-pulse" />
                        <AlertCircle size={120} strokeWidth={1} className="text-red-800 relative z-10" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-7xl font-serif tracking-tight">Algo salió <span className="italic">Mal</span></h1>
                    <p className="text-muted-fg uppercase tracking-[0.3em] text-xs">No pudimos procesar su pago en este momento</p>
                </div>

                <div className="bg-red-50/30 p-10 border border-red-100 space-y-6">
                    <p className="font-serif italic text-xl text-foreground text-red-900/80">
                        "Incluso en las imperfecciones, buscamos la excelencia."
                    </p>
                    <p className="text-xs text-muted-fg leading-relaxed">
                        Es posible que haya un problema con su tarjeta o que la transacción haya sido cancelada. 
                        No se ha realizado ningún cargo en su cuenta.
                    </p>
                    {status && (
                         <div className="pt-6 border-t border-red-100 flex flex-col items-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-muted-fg">Estado del Error</span>
                            <span className="font-mono text-xs uppercase text-red-800">{status}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row justify-center gap-8 pt-8">
                    <Link 
                        href="/checkout" 
                        className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold py-5 px-10 border border-foreground hover:bg-foreground hover:text-background transition-all duration-500"
                    >
                        Reintentar Pago
                        <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                    </Link>
                    
                    <Link 
                        href="/products" 
                        className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold py-5 px-10 bg-foreground text-background hover:bg-accent transition-all duration-500"
                    >
                        Volver al Catálogo
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                </div>

                <p className="text-[10px] text-muted-fg leading-relaxed max-w-sm mx-auto">
                    Si el problema persiste, por favor contacte con nuestro servicio de atención al cliente o intente con otro método de pago.
                </p>
            </div>
        </div>
    );
}
