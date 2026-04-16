'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-700 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-background w-full max-w-md shadow-[0_32px_64px_rgba(0,0,0,0.2)] animate-zoom-in border-t-4 border-accent">
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-12">
            {title && (
              <h2 className="text-3xl font-serif tracking-tight">{title}</h2>
            )}
            <button 
              onClick={onClose}
              className="group relative w-6 h-6 flex items-center justify-center"
            >
              <div className="absolute w-full h-px bg-foreground rotate-45 group-hover:bg-accent transition-colors duration-300" />
              <div className="absolute w-full h-px bg-foreground -rotate-45 group-hover:bg-accent transition-colors duration-300" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
