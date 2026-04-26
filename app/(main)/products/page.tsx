
import { fetchProductList } from '@/app/(admin)/admin/products/productService';
import ProductContent from './ProductContent';
import { fetchCategoryList } from '@/app/(admin)/admin/categories/categoryService';

const PRODUCTS = [
  { id: '1', name: 'Solaris Earrings', price: '$1,200', category: 'Earrings', image: '/earrings.png' },
  { id: '2', name: 'Ethereal Ring', price: '$2,500', category: 'Rings', image: '/hero.png' },
  { id: '3', name: 'Lumina Bracelet', price: '$1,850', category: 'Bracelets', image: '/bracelet.png' },
  { id: '4', name: 'Aura Necklace', price: '$3,100', category: 'Necklaces', image: '/hero.png' },
  { id: '5', name: 'Nova Studs', price: '$850', category: 'Earrings', image: '/earrings.png' },
  { id: '6', name: 'Celestial Band', price: '$1,500', category: 'Rings', image: '/hero.png' },
];

export default async function ProductsPage() {

  const products = await fetchProductList();

  const categories = await fetchCategoryList();

  return (
    <div className="min-h-screen flex flex-col">
      <ProductContent data={products} categories={categories} />
    </div>
  );
}
