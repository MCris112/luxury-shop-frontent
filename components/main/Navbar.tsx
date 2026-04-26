'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/app/auth/AuthProvider';
import { LoginModal } from '../../app/auth/LoginModal';

import { useCart } from '@/app/(shop)/CartProvider';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 h-20 flex items-center justify-between">
          <Link href="/" className="group">
            <span className="font-serif text-2xl tracking-[0.1em] uppercase font-bold text-foreground group-hover:text-accent transition-colors duration-500">
              LUXURY
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {[
              { label: 'inicio', path: '/' },
              { label: 'productos', path: '/products' },
              { label: 'sobre nosotros', path: '/about' },
              { label: 'cv', path: '/cv' },
              { label: 'admin', path: '/admin' }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className="text-xs uppercase tracking-[0.3em] text-foreground hover:text-accent transition-colors duration-500 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent">
                    {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="text-[10px] uppercase tracking-[0.3em] font-medium hover:text-accent transition-colors duration-500"
                  >
                    Salir
                  </button>
                </div>

                <Link href="/admin" className="text-xs uppercase tracking-[0.3em] font-medium hover:text-accent transition-colors duration-500">
                  Panel
                </Link>
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-xs uppercase tracking-[0.3em] font-medium hover:text-accent transition-colors duration-500"
              >
                Acceder
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="text-xs uppercase tracking-[0.3em] font-medium hover:text-accent transition-colors duration-500 flex items-center gap-2"
            >
              Bolsa <span className="text-[10px] text-muted-fg">({totalItems})</span>
            </button>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};
