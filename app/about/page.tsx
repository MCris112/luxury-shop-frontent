import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-40 pb-32">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 text-center">
          <h1 className="text-7xl md:text-[10rem] font-serif leading-none tracking-tighter mb-12">
            Our <span className="italic text-accent">Heritage</span>
          </h1>
          <div className="max-w-2xl mx-auto border-t border-accent w-24 mb-16 h-px"></div>
        </div>

        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-16 items-center mb-32">
          <div className="md:col-span-7 relative aspect-video shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <Image
              src="/about.png"
              alt="Artisanal Workshop"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:col-span-5">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent mb-6">The Process</h2>
            <h3 className="text-4xl font-serif mb-8 tracking-tight">Crafting the <span className="italic">Impossible</span></h3>
            <p className="font-sans text-lg text-muted-fg leading-relaxed mb-6">
              Founded in 1994, AURUM was born from a desire to blend traditional craftsmanship with modern minimalist aesthetics. Every piece is handmade in our London atelier by master jewelers.
            </p>
            <p className="font-sans text-lg text-muted-fg leading-relaxed">
              We source our stones from conflict-free mines and use 100% recycled gold, ensuring that our commitment to beauty extends to the environment and the communities we work with.
            </p>
          </div>
        </div>

        <div className="bg-foreground text-background py-32">
          <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
              <div>
                <span className="font-serif text-6xl block mb-4 text-accent">30+</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-background/60">Years of Craft</span>
              </div>
              <div>
                <span className="font-serif text-6xl block mb-4 text-accent">100%</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-background/60">Ethical Sourcing</span>
              </div>
              <div>
                <span className="font-serif text-6xl block mb-4 text-accent">Handmade</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-background/60">Made in London</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
              <h2 className="text-5xl font-serif mb-8 tracking-tight">The <span className="italic text-accent underline underline-offset-8 decoration-1">Philosophy</span></h2>
              <p className="drop-cap font-sans text-lg text-muted-fg leading-relaxed mb-8">
                Design is at the heart of everything we do. We believe that jewelry should be an extension of the wearer's personality—subtle yet commanding, timeless yet contemporary.
              </p>
            </div>
            <div className="md:col-start-7 md:col-span-5 aspect-square relative shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <Image
                src="/hero.png"
                alt="Product Minimal"
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
