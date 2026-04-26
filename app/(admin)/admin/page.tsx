'use client'

import seederData from '../seeder.json';
import { fetchCategoryStore } from './categories/categoryService';
import { fetchProductStore } from './products/productService';
import { fetchUserStore } from './users/userService';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {

  /**
   * Loads seed data progressively to ensure data integrity.
   * Order: Users -> Categories -> Products
   */
  const loadPreData = async () => {
    const { users, categories, products } = seederData;

    try {
      // 1. Load Users first
      console.log("Starting to load users...");
      for (const u of users) {
        try {
          const result = await fetchUserStore(u);
          console.log("User added correctly:", result);
        } catch (error) {
          console.warn("Skipping user (already exists or error):", u.email);
        }
      }

      // 2. Load Categories after users are finished
      console.log("Starting to load categories...");
      for (const c of categories) {
        try {
          const result = await fetchCategoryStore(c);
          console.log("Category added correctly:", result);
        } catch (error) {
          console.warn("Skipping category (already exists or error):", c.slug);
        }
      }

      // 3. Finally, load Products once categories exist
      console.log("Starting to load products...");
      for (const p of products) {
        try {
          const product = {
            ...p,
            slug: p.name.toLowerCase().replace(/ /g, "-")
          };
          const result = await fetchProductStore(product);
          console.log("Product added correctly:", result);
        } catch (error) {
          console.warn("Skipping product (already exists or error):", p.name);
        }
      }

      alert("Data loaded successfully!");
    } catch (error) {
      console.error("Error loading pre-data:", error);
      alert("Failed to load some data. Check console for details.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif mb-8 text-accent">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
          <h2 className="text-xl font-serif mb-2">Products</h2>
          <p className="text-muted-foreground mb-4">Manage your luxury catalog</p>

          <Button href='/admin/products' >
            Ver los productos
          </Button>
        </div>
        <div className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
          <h2 className="text-xl font-serif mb-2">Users</h2>
          <p className="text-muted-foreground mb-4">Manage customers and admins</p>

          <Button href='/admin/users' >
            Ver los usuarios
          </Button>
        </div>
        <div className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
          <h2 className="text-xl font-serif mb-2">Orders</h2>
          <p className="text-muted-foreground mb-4">Track sales and fulfillments</p>
          <Button href='/admin/orders' >
            Ver las ordenes
          </Button>
        </div>
      </div>

      <button className='px-4 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity' onClick={loadPreData} >Carcar valores iniciales</button>
    </div>
  );
}

