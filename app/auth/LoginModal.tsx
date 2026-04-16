'use client';

import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '@/app/auth/AuthProvider';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error de autenticación. Por favor verifique sus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Acceder">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-8">
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="email@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 font-sans tracking-wide">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-6 pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Procesando —' : 'Ingresar —'}
          </Button>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-fg text-center leading-relaxed">
            Al acceder, usted acepta nuestros <br />
            <span className="text-foreground hover:text-accent cursor-pointer transition-colors duration-300">Términos de Servicio</span> y <span className="text-foreground hover:text-accent cursor-pointer transition-colors duration-300">Política de Privacidad</span>.
          </p>
        </div>
      </form>
    </Modal>
  );
};
