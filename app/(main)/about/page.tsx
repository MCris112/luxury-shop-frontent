import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">

      <section className="pt-40 pb-32">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 text-center">
          <h1 className="text-7xl md:text-[10rem] font-serif leading-none tracking-tighter mb-12">
            Nuestra <span className="italic text-accent">Herencia</span>
          </h1>
          <div className="max-w-2xl mx-auto border-t border-accent w-24 mb-16 h-px"></div>
        </div>

        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-16 items-center mb-32">
          <div className="md:col-span-7 relative aspect-video shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <Image
              src="/about.png"
              alt="Taller Artesanal"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:col-span-5">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent mb-6">El Proceso</h2>
            <h3 className="text-4xl font-serif mb-8 tracking-tight">Creando lo <span className="italic">Imposible</span></h3>
            <p className="font-sans text-lg text-muted-fg leading-relaxed mb-6">
              Fundada en 1994, LUXURY nació del deseo de combinar la artesanía tradicional con una estética minimalista moderna. Cada pieza está hecha a mano en nuestro taller de Londres por maestros joyeros.
            </p>
            <p className="font-sans text-lg text-muted-fg leading-relaxed">
              Obtenemos nuestras piedras de minas libres de conflictos y usamos oro 100% reciclado, asegurando que nuestro compromiso con la belleza se extienda al medio ambiente y a las comunidades con las que trabajamos.
            </p>
          </div>
        </div>

        <div className="bg-foreground text-background py-32">
          <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
              <div>
                <span className="font-serif text-6xl block mb-4 text-accent">30+</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-background/60">Años de Oficio</span>
              </div>
              <div>
                <span className="font-serif text-6xl block mb-4 text-accent">100%</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-background/60">Abastecimiento Ético</span>
              </div>
              <div>
                <span className="font-serif text-6xl block mb-4 text-accent">Artesanal</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-background/60">Hecho en Londres</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
              <h2 className="text-5xl font-serif mb-8 tracking-tight">La <span className="italic text-accent underline underline-offset-8 decoration-1">Filosofía</span></h2>
              <p className="drop-cap font-sans text-lg text-muted-fg leading-relaxed mb-8">
                El diseño está en el corazón de todo lo que hacemos. Creemos que la joyería debe ser una extensión de la personalidad de quien la lleva: sutil pero imponente, atemporal pero contemporánea.
              </p>
            </div>
            <div className="md:col-start-7 md:col-span-5 aspect-square relative shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <Image
                src="/hero.png"
                alt="Producto Minimalista"
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
