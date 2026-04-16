import { fetchProductList } from "@/app/(main)/products/productService";
import ProductContent from "./PorductContent";

export default async function AdminProducts() {
  // const products = [
  //   { id: 1, name: "Celestial Band", category: "Rings", price: "$12,400", stock: 12 },
  //   { id: 2, name: "Elysian Necklace", category: "Necklace", price: "$28,000", stock: 5 },
  //   { id: 3, name: "Lumina Studs", category: "Earrings", price: "$8,500", stock: 24 },
  // ];

  const products = await fetchProductList();

  return (
    <div>
      <ProductContent data={products} />
    </div>
  );
}
