import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ui/ProductCard';

const PRODUCTS = [
  { id: '1', name: 'Solaris Earrings', price: '$1,200', category: 'Earrings', image: '/earrings.png' },
  { id: '2', name: 'Ethereal Ring', price: '$2,500', category: 'Rings', image: '/hero.png' },
  { id: '3', name: 'Lumina Bracelet', price: '$1,850', category: 'Bracelets', image: '/bracelet.png' },
  { id: '4', name: 'Aura Necklace', price: '$3,100', category: 'Necklaces', image: '/hero.png' },
  { id: '5', name: 'Nova Studs', price: '$850', category: 'Earrings', image: '/earrings.png' },
  { id: '6', name: 'Celestial Band', price: '$1,500', category: 'Rings', image: '/hero.png' },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-foreground/10 pb-12">
            <div>
              <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-4">The <span className="italic">Collection</span></h1>
              <p className="text-muted-fg uppercase tracking-[0.2em] text-xs">A curation of timeless elegance</p>
            </div>

            <div className="flex gap-8 mt-12 md:mt-0">
              {['All', 'Earrings', 'Rings', 'Bracelets', 'Necklaces'].map((filter) => (
                <button
                  key={filter}
                  className="text-xs uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors duration-500 pb-2 border-b border-transparent hover:border-accent"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
