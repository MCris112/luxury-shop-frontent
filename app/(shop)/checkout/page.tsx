'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Image from 'next/image';
import { useCart } from '@/app/(shop)/CartProvider';
import { orderStore } from '@/app/(shop)/shopService';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import toast from 'react-hot-toast';
import { Order, OrderStore } from '../shop.types';

// Initialize MP with a placeholder PUBLIC KEY
// NOTE: Make sure to replace this with your actual public key
initMercadoPago('APP_USR-07253147-ef94-41d2-882c-021c8d0c94bf', {
  locale: 'es-PE'
});

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, placeholder } = e.target;
    // Map placeholders to field names since Input component doesn't have names in this simple demo
    const fieldMapping: Record<string, string> = {
      'Nombre': 'name',
      'Email': 'email',
      'Dirección': 'address',
      'Ciudad': 'city',
      'Código Postal': 'zip'
    };

    const fieldName = fieldMapping[placeholder || ''] || name;
    setFormData(prev => ({ ...prev, [fieldName]: e.target.value }));
  };

  const buildOrder = (): OrderStore => {
    return {
      user: {
        name: formData.name,
        email: formData.email
      },
      address: `${formData.address}, ${formData.city}, ${formData.zip}`,
      paymentMethod: "mercadopago",
      items: cart.items.map(item => ({
        product: {
          id: item.product.id
        },
        quantity: item.quantity,
      })),
    }
  }

  const handleCreatePreference = async () => {
    if (cart.items.length === 0) {
      toast.error("Tu bolsa está vacía");
      return;
    }

    setIsLoading(true);
    try {
      // We send the order to the backend to get the preferenceId
      const response = await orderStore(buildOrder());

      console.log("ORDER RESPONSE", response)

      if (response.payment.paymentId) {
        setPreferenceId(response.payment.paymentId);
        toast.success("Preferencia de pago generada");
      } else {
        throw new Error("No preferenceId received");
      }
    } catch (error) {
      console.error("Error creating preference:", error);
      toast.error("Error al procesar el pago. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="pt-40 pb-32">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <h1 className="text-5xl font-serif mb-16 tracking-tight">Finalizar Pedido</h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
            <div className="md:col-span-7 flex flex-col gap-16">
              <div className="border-t border-foreground/10 pt-12">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-12">01 — Información de Envío</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 text-foreground">
                  <Input placeholder="Nombre" onChange={handleInputChange} />
                  <Input placeholder="Email" onChange={handleInputChange} />
                  <div className="col-span-2">
                    <Input placeholder="Dirección" onChange={handleInputChange} />
                  </div>
                  <Input placeholder="Ciudad" onChange={handleInputChange} />
                  <Input placeholder="Código Postal" onChange={handleInputChange} />
                </div>
              </div>

              <div className="border-t border-foreground/10 pt-12">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-12">02 — Método de Pago (Mercado Pago)</h2>

                {preferenceId ? (
                  <div className="p-8 border border-accent/20 bg-muted-bg/10">
                    <p className="text-xs uppercase tracking-widest text-muted-fg mb-8 text-center italic">
                      Su orden está lista para ser procesada de forma segura.
                    </p>
                    <div id="wallet_container" className="max-w-md mx-auto">
                      <Wallet
                        initialization={{ preferenceId: preferenceId }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-12 border border-foreground/5 text-center flex flex-col items-center gap-8">
                    <p className="text-sm text-muted-fg font-serif italic">
                      Haga clic en el botón de abajo para generar su link de pago seguro a través de Mercado Pago.
                    </p>
                    <Button
                      onClick={handleCreatePreference}
                      disabled={isLoading || cart.items.length === 0}
                      size="lg"
                      className="w-full md:w-auto"
                    >
                      {isLoading ? "Procesando..." : `Generar Pago — $${cart.total.toLocaleString()}`}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="bg-muted-bg/30 p-12 border-t-4 border-accent">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-12">Su Selección ({cart.items.length})</h2>

                <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 mb-12 custom-scrollbar">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex gap-6 pb-8 border-b border-foreground/5 last:border-0 last:pb-0">
                      <div className="w-20 aspect-square relative bg-muted-bg flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover grayscale"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <h3 className="font-serif text-lg leading-tight mb-1">{item.product.name}</h3>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-fg">Cant. {item.quantity}</p>
                        </div>
                        <p className="font-sans font-medium text-sm">{item.product.price}</p>
                      </div>
                    </div>
                  ))}
                  {cart.items.length === 0 && (
                    <p className="font-serif italic text-muted-fg py-8">No hay artículos en su bolsa.</p>
                  )}
                </div>

                <div className="pt-12 flex flex-col gap-6">
                  <div className="flex justify-between text-sm uppercase tracking-[0.1em]">
                    <span className="text-muted-fg">Subtotal</span>
                    <span>${cart.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm uppercase tracking-[0.1em]">
                    <span className="text-muted-fg">Envío</span>
                    <span className="text-accent italic">Cortesia</span>
                  </div>
                  <div className="flex justify-between text-xl font-serif pt-6 border-t border-foreground/10 mt-6 font-bold">
                    <span>Total</span>
                    <span>${cart.total.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-[10px] text-muted-fg leading-relaxed mt-12 text-center">
                  Pago seguro procesado por Mercado Pago localmente. <br />
                  Envío internacional gratuito en todos los pedidos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
