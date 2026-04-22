import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/app/(main)/products/ProductCard';
import Image from 'next/image';
import { fetchProductList } from './products/productService';

export default async function Home() {

  const product = (await fetchProductList()).sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-accent"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-medium">Colección Nº 01</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] tracking-tight mb-8">
              Excelencia <br />
              <span className="italic text-accent">Curada</span>
            </h1>
            <p className="font-sans text-lg text-muted-fg max-w-md mb-12 leading-relaxed">
              Descubre un mundo donde la artesanía se encuentra con el diseño contemporáneo. Nuestras piezas seleccionadas están diseñadas para contar tu historia única.
            </p>
            <div className="flex gap-6">
              <Button size="lg">Comprar Colección</Button>
              <Button variant="link">Nuestra Filosofía</Button>
            </div>
          </div>

          <div className="md:col-start-7 md:col-span-6 relative aspect-[4/5] md:aspect-[3/4] shadow-[0_8px_32px_rgba(0,0,0,0.12)] editorial-transition">
            <Image
              src="/hero.png"
              alt="Joyas de Lujo"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute -left-12 bottom-24 hidden md:block">
              <span className="writing-vertical text-xs uppercase tracking-[0.5em] text-foreground opacity-30">
                Editorial / Vol. 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 md:py-32 bg-muted-bg/30">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent mb-4">La Selección</h2>
              <h3 className="text-4xl md:text-6xl font-serif tracking-tight">
                Objetos de <span className="italic">Deseo</span>
              </h3>
            </div>
            <Button variant="secondary">Ver Todos los Productos</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {product.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 aspect-[4/5] relative shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <Image
                src="/about.png"
                alt="Artesanía"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
              />
            </div>

            <div className="md:col-start-7 md:col-span-5">
              <h2 className="text-4xl md:text-5xl font-serif mb-12 tracking-tight leading-tight">
                El <span className="italic">Arte</span> del <br />
                <span className="text-accent underline underline-offset-8 decoration-1">Detalle</span> Meticuloso
              </h2>
              <p className="drop-cap font-sans text-lg text-muted-fg leading-relaxed mb-8">
                Cada pieza de nuestra colección es un testimonio del toque artesanal. Creemos que el verdadero lujo reside en los detalles: la sutil curva de un engaste, la forma en que la luz baila sobre una piedra y la calidad perdurable de los materiales.
              </p>
              <p className="font-sans text-lg text-muted-fg leading-relaxed mb-12">
                Nuestro proceso comienza con los mejores materiales y termina con una obra maestra que trasciende el tiempo. Estamos comprometidos con el abastecimiento ético y las prácticas sostenibles.
              </p>
              <Button variant="secondary">Nuestra Historia</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="py-12 border-t border-foreground/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-muted-fg">
            Esta es una página de demostración creada por{' '}
            <a
              href="https://darkredgm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Darkredgm - Cristopher
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
