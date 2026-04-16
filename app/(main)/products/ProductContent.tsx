'use client'

import { useState } from "react";
import { Product } from "./product.types";
import { ProductCard } from "@/app/(main)/products/ProductCard";

export default function ProductContent({ data }: { data: Product[] }) {
    const [product, setProducts] = useState<Product[]>(data);


    return (
        <section className="pt-40 pb-24">
            <div className="max-w-[1600px] mx-auto px-8 md:px-16">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-foreground/10 pb-12">
                    <div>
                        <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-4">Nuestra <span className="italic">Colección</span></h1>
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
                    {product.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}