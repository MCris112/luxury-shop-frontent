'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/app/auth/AuthProvider';
import { LoginModal } from './auth/LoginModal';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 h-20 flex items-center justify-between">
          <Link href="/" className="group">
            <span className="font-serif text-2xl tracking-[0.1em] uppercase font-bold text-foreground group-hover:text-accent transition-colors duration-500">
              AURUM
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {['home', 'products', 'about'].map((item) => (
              <Link
                key={item}
                href={item === 'home' ? '/' : `/${item}`}
                className="text-xs uppercase tracking-[0.3em] text-foreground hover:text-accent transition-colors duration-500 font-medium"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
            {isAuthenticated ? (
              <div className="flex items-center gap-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent">
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="text-[10px] uppercase tracking-[0.3em] font-medium hover:text-accent transition-colors duration-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-xs uppercase tracking-[0.3em] font-medium hover:text-accent transition-colors duration-500"
              >
                Sign In
              </button>
            )}

            <Link href="/checkout" className="text-xs uppercase tracking-[0.3em] font-medium hover:text-accent transition-colors duration-500 flex items-center gap-2">
              Bag <span className="text-[10px] text-muted-fg">(0)</span>
            </Link>
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
