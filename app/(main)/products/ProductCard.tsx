'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/app/(main)/products/product.types';
import { useCart } from '@/app/(shop)/CartProvider';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering any parent click events
    addToCart(product);
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square overflow-hidden bg-muted-bg mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-[1500ms]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        />

        {/* Hover overlay for Add to Cart */}
        <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]">
          <button
            onClick={handleAdd}
            className="bg-foreground text-background px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-accent transition-colors duration-500 shadow-xl"
          >
            Agregar —
          </button>
        </div>

        <div className="absolute top-4 left-4 z-10">
          {product.categories.map((category) => (
            <span key={category.id} className="text-[10px] uppercase tracking-[0.3em] bg-background/80 backdrop-blur-sm px-3 py-1 text-foreground">
              {category.name}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-foreground/10 pt-4 flex justify-between items-start group-hover:border-foreground/30 transition-colors duration-700">
        <div>
          <h3 className="font-serif text-xl mb-1 group-hover:text-accent transition-colors duration-500">
            {product.name}
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-fg">
            {product.information}
          </p>
        </div>
        <div className="font-sans font-medium text-lg">
          {product.price}
        </div>
      </div>
    </div>
  );
};
