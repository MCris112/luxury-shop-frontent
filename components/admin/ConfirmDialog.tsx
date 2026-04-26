'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

interface ConfirmOptions {
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'info';
    onConfirm?: () => Promise<void>;
}

interface ConfirmContextType {
    confirm: (options?: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({});
    const [resolveRef, setResolveRef] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const confirm = useCallback((newOptions: ConfirmOptions = {}) => {
        setOptions({
            title: '¿Estás seguro?',
            description: 'Esta acción no se puede deshacer.',
            confirmLabel: 'Confirmar',
            cancelLabel: 'Cancelar',
            variant: 'danger',
            ...newOptions
        });
        setIsOpen(true);
        setIsLoading(false);
        return new Promise<boolean>((resolve) => {
            setResolveRef({ resolve });
        });
    }, []);

    const handleConfirm = async () => {
        if (options.onConfirm) {
            setIsLoading(true);
            try {
                await options.onConfirm();
                resolveRef?.resolve(true);
                setIsOpen(false);
            } catch (error) {
                console.error("Confirm action failed:", error);
                // We keep it open if it fails, or we could close it. 
                // Usually better to keep it open or show error.
                // For now, let's allow the user to try again.
            } finally {
                setIsLoading(false);
            }
        } else {
            resolveRef?.resolve(true);
            setIsOpen(false);
        }
    };

    const handleCancel = () => {
        if (isLoading) return;
        resolveRef?.resolve(false);
        setIsOpen(false);
    };

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
                        onClick={handleCancel}
                    />
                    
                    {/* Dialog */}
                    <div className="relative bg-white/80 backdrop-blur-xl border border-black/5 rounded-sm w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-8">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-full flex-shrink-0 ${options.variant === 'danger' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                    <AlertTriangle size={24} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-serif text-2xl text-accent">{options.title}</h3>
                                    <p className="font-sans text-sm text-muted-fg leading-relaxed">
                                        {options.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex border-t border-black/5">
                            <button
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="flex-1 px-6 py-4 text-xs uppercase tracking-widest font-bold hover:bg-black/5 transition-colors border-r border-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {options.cancelLabel}
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={isLoading}
                                className={`flex-1 px-6 py-4 text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed ${
                                    options.variant === 'danger' 
                                    ? 'text-red-500 hover:bg-red-50' 
                                    : 'text-blue-500 hover:bg-blue-50'
                                }`}
                            >
                                {isLoading && <Loader2 size={14} className="animate-spin" />}
                                {isLoading ? 'Procesando...' : options.confirmLabel}
                            </button>
                        </div>
                        
                        {!isLoading && (
                            <button 
                                onClick={handleCancel}
                                className="absolute top-4 right-4 p-2 text-muted-fg hover:text-accent transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within a ConfirmProvider');
    }
    return context.confirm;
}

