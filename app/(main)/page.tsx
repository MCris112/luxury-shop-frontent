import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/app/(main)/products/ProductCard';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-accent"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-medium">Collection No. 01</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] tracking-tight mb-8">
              Curated <br />
              <span className="italic text-accent">Excellence</span>
            </h1>
            <p className="font-sans text-lg text-muted-fg max-w-md mb-12 leading-relaxed">
              Discover a world where craftsmanship meets contemporary design. Our curated pieces are designed to tell your unique story.
            </p>
            <div className="flex gap-6">
              <Button size="lg">Shop Collection</Button>
              <Button variant="link">Our Philosophy</Button>
            </div>
          </div>

          <div className="md:col-start-7 md:col-span-6 relative aspect-[4/5] md:aspect-[3/4] shadow-[0_8px_32px_rgba(0,0,0,0.12)] editorial-transition">
            <Image
              src="/hero.png"
              alt="Luxury Jewelry Hero"
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
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent mb-4">The Selection</h2>
              <h3 className="text-4xl md:text-6xl font-serif tracking-tight">
                Objects of <span className="italic">Desire</span>
              </h3>
            </div>
            <Button variant="secondary">View All Products</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* <ProductCard
              id="1"
              name="Solaris Earrings"
              price="$1,200"
              category="Earrings"
              image="/earrings.png"
            />
            <ProductCard
              id="2"
              name="Ethereal Ring"
              price="$2,500"
              category="Rings"
              image="/hero.png"
            />
            <ProductCard
              id="3"
              name="Lumina Bracelet"
              price="$1,850"
              category="Bracelets"
              image="/bracelet.png"
            /> */}
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
                alt="Craftsmanship"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
              />
            </div>

            <div className="md:col-start-7 md:col-span-5">
              <h2 className="text-4xl md:text-5xl font-serif mb-12 tracking-tight leading-tight">
                The <span className="italic">Art</span> of <br />
                Meticulous <span className="text-accent underline underline-offset-8 decoration-1">Detail</span>
              </h2>
              <p className="drop-cap font-sans text-lg text-muted-fg leading-relaxed mb-8">
                Every piece in our collection is a testament to the artisan's touch. We believe that true luxury lies in the details—the subtle curve of a setting, the way light dances across a stone, and the enduring quality of materials.
              </p>
              <p className="font-sans text-lg text-muted-fg leading-relaxed mb-12">
                Our process begins with the finest materials and ends with a masterpiece that transcends time. We are committed to ethical sourcing and sustainable practices.
              </p>
              <Button variant="secondary">Read Our Story</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
