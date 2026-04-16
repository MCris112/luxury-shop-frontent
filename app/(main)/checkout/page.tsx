import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Image from 'next/image';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">

      <section className="pt-40 pb-32">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <h1 className="text-5xl font-serif mb-16 tracking-tight">Finalizar Pedido</h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
            <div className="md:col-span-7 flex flex-col gap-16">
              <div className="border-t border-foreground/10 pt-12">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-12">01 — Información de Envío</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                  <Input placeholder="Nombre" />
                  <Input placeholder="Apellido" />
                  <div className="col-span-2">
                    <Input placeholder="Dirección" />
                  </div>
                  <Input placeholder="Ciudad" />
                  <Input placeholder="Código Postal" />
                </div>
              </div>

              <div className="border-t border-foreground/10 pt-12">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-12">02 — Método de Pago</h2>
                <div className="flex gap-12 mb-12">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 border border-foreground rounded-none flex items-center justify-center">
                      <div className="w-2 h-2 bg-accent" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em]">Tarjeta de Crédito</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                    <div className="w-4 h-4 border border-foreground rounded-none" />
                    <span className="text-xs uppercase tracking-[0.2em]">PayPal</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                  <div className="col-span-2">
                    <Input placeholder="Número de Tarjeta" />
                  </div>
                  <Input placeholder="Fecha de Vencimiento (MM/AA)" />
                  <Input placeholder="CVV" />
                </div>
              </div>

              <Button size="lg" className="w-full md:w-auto">Completar Compra — $1,200</Button>
            </div>

            <div className="md:col-span-5">
              <div className="bg-muted-bg/30 p-12 border-t-4 border-accent">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-12">Su Selección (1)</h2>

                <div className="flex gap-6 pb-12 border-b border-foreground/10">
                  <div className="w-24 aspect-[3/4] relative bg-muted-bg">
                    <Image
                      src="/earrings.png"
                      alt="Solaris Earrings"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl mb-1">Solaris Earrings</h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-fg">Yellow Gold / Diamonds</p>
                    </div>
                    <p className="font-sans font-medium">$1,200</p>
                  </div>
                </div>

                <div className="pt-12 flex flex-col gap-6">
                  <div className="flex justify-between text-sm uppercase tracking-[0.1em]">
                    <span className="text-muted-fg">Subtotal</span>
                    <span>$1,200</span>
                  </div>
                  <div className="flex justify-between text-sm uppercase tracking-[0.1em]">
                    <span className="text-muted-fg">Envío</span>
                    <span className="text-accent italic">Cortesia</span>
                  </div>
                  <div className="flex justify-between text-xl font-serif pt-6 border-t border-foreground/10 mt-6 font-bold">
                    <span>Total</span>
                    <span>$1,200</span>
                  </div>
                </div>

                <p className="text-[10px] text-muted-fg leading-relaxed mt-12 text-center">
                  Pago seguro procesado por AURUM. <br />
                  Envío internacional gratuito en todos los pedidos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
