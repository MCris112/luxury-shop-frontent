import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

export const ProductCard = ({ id, name, price, category, image }: ProductCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted-bg mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-[1500ms]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] bg-background/80 backdrop-blur-sm px-3 py-1 text-foreground">
            {category}
          </span>
        </div>
      </div>
      
      <div className="border-t border-foreground/10 pt-4 flex justify-between items-start group-hover:border-foreground/30 transition-colors duration-700">
        <div>
          <h3 className="font-serif text-xl mb-1 group-hover:text-accent transition-colors duration-500">
            {name}
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-fg">
            Explore Details
          </p>
        </div>
        <div className="font-sans font-medium text-lg">
          {price}
        </div>
      </div>
    </div>
  );
};
