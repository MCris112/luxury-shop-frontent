'use client'

import { useState, useEffect } from "react";
import { ProductCard } from "@/app/(main)/products/ProductCard";
import { Category } from "@/app/(admin)/admin/categories/category.types";
import { useForm } from "react-hook-form";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/app/(admin)/admin/products/product.types";
import { fetchProductList } from "@/app/(admin)/admin/products/productService";

interface FilterForm {
    searchTerm: string;
    minPrice: string;
    maxPrice: string;
    categories: string[];
}

export default function ProductContent({ data, categories }: { data: Product[], categories: Category[] }) {
    const [products, setProducts] = useState<Product[]>(data);
    const [isLoading, setIsLoading] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { register, watch, setValue, reset } = useForm<FilterForm>({
        defaultValues: {
            searchTerm: "",
            minPrice: "",
            maxPrice: "",
            categories: []
        }
    });

    const formValues = watch();
    const { searchTerm, minPrice, maxPrice, categories: selectedCategories } = formValues;

    // Local filtering for immediate feedback
    useEffect(() => {
        let filtered = data;

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.information?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p =>
                p.categories.some(c => selectedCategories.includes(c.slug))
            );
        }

        if (minPrice) {
            filtered = filtered.filter(p => Number(p.price.replace(/[^0-9.]/g, '')) >= Number(minPrice));
        }

        if (maxPrice) {
            filtered = filtered.filter(p => Number(p.price.replace(/[^0-9.]/g, '')) <= Number(maxPrice));
        }

        setProducts(filtered);
    }, [formValues, data]);

    // Debounced server-side search/filter
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            // Only fetch if something actually changed from initial state
            if (!searchTerm && !minPrice && !maxPrice && selectedCategories.length === 0) return;

            setIsLoading(true);
            try {
                const results = await fetchProductList(
                    selectedCategories.length > 0 ? selectedCategories : undefined,
                    searchTerm || undefined,
                    minPrice ? Number(minPrice) : undefined,
                    maxPrice ? Number(maxPrice) : undefined
                );
                setProducts(results);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        }, 800);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, minPrice, maxPrice, selectedCategories]);

    const handleCategoryToggle = (slug: string) => {
        const current = [...selectedCategories];
        const index = current.indexOf(slug);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(slug);
        }
        setValue("categories", current);
    };

    return (
        <section className="pt-40 pb-24">
            <div className="max-w-[1600px] mx-auto px-8 md:px-16">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-foreground/10 pb-12 gap-8">
                    <div className="max-w-xl w-full">
                        <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-4">Nuestra <span className="italic">Colección</span></h1>
                        <p className="text-muted-fg uppercase tracking-[0.2em] text-xs mb-8">Una curaduría de elegancia atemporal</p>

                        <div className="flex items-center gap-6">
                            <div className="relative group flex-1">
                                <input
                                    {...register("searchTerm")}
                                    type="text"
                                    placeholder="Buscar joyas..."
                                    className="w-full bg-transparent border-b border-foreground/10 focus:border-accent outline-none py-3 font-serif italic text-lg transition-all duration-500 placeholder:text-muted-fg/40"
                                />
                                <div className="absolute bottom-0 left-0 h-px bg-accent w-0 group-focus-within:w-full transition-all duration-700"></div>
                            </div>

                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-medium transition-colors duration-500 py-3 border-b ${isFilterOpen ? 'border-accent text-accent' : 'border-transparent text-foreground hover:text-accent'}`}
                            >
                                <SlidersHorizontal size={14} />
                                {isFilterOpen ? 'Cerrar Filtros' : 'Filtrar'}
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-wrap gap-x-8 gap-y-4 justify-end pb-3">
                        {categories.slice(0, 4).map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryToggle(category.slug)}
                                className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-500 pb-2 border-b ${selectedCategories.includes(category.slug) ? 'border-accent text-accent' : 'border-transparent text-muted-fg hover:text-foreground'}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Expanded Filters Section */}
                <div className={`overflow-hidden transition-all duration-700 ease-in-out mb-16 bg-muted-bg/30 ${isFilterOpen ? 'max-h-[600px] border-b border-foreground/5 opacity-100 py-12' : 'max-h-0 opacity-0'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div>
                            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-8">Categorías</h3>
                            <div className="grid grid-cols-2 gap-y-4">
                                {categories.map((category) => (
                                    <label key={category.id} className="flex items-center gap-3 cursor-pointer group w-fit">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                value={category.slug}
                                                {...register("categories")}
                                                className="peer hidden"
                                            />
                                            <div className="h-4 w-4 border border-foreground/20 peer-checked:border-accent peer-checked:bg-accent transition-all duration-300"></div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                                                <div className="h-1.5 w-1.5 bg-background"></div>
                                            </div>
                                        </div>
                                        <span className="text-xs uppercase tracking-[0.2em] text-muted-fg group-hover:text-foreground transition-colors">
                                            {category.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-8">Rango de Precio</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <span className="text-[9px] uppercase tracking-widest text-muted-fg/60 block mb-2">Mínimo</span>
                                    <input
                                        {...register("minPrice")}
                                        type="number"
                                        placeholder="0"
                                        className="w-full bg-transparent border-b border-foreground/10 focus:border-accent outline-none py-2 font-serif italic text-base transition-all"
                                    />
                                </div>
                                <div className="h-px w-4 bg-foreground/10 mt-6"></div>
                                <div className="flex-1">
                                    <span className="text-[9px] uppercase tracking-widest text-muted-fg/60 block mb-2">Máximo</span>
                                    <input
                                        {...register("maxPrice")}
                                        type="number"
                                        placeholder="10,000"
                                        className="w-full bg-transparent border-b border-foreground/10 focus:border-accent outline-none py-2 font-serif italic text-base transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-end">
                            <button
                                onClick={() => reset()}
                                className="text-[10px] uppercase tracking-[0.3em] font-medium text-muted-fg hover:text-accent transition-colors flex items-center gap-2 self-end"
                            >
                                <X size={12} />
                                Limpiar Filtros
                            </button>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24 opacity-50 transition-opacity duration-500">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="animate-pulse">
                                <div className="aspect-square bg-muted-bg mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"></div>
                                <div className="h-4 bg-muted-bg w-2/3 mb-4"></div>
                                <div className="h-3 bg-muted-bg w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center border border-dashed border-foreground/10">
                        <p className="font-serif italic text-2xl text-muted-fg mb-4">No se encontraron piezas que coincidan con su búsqueda.</p>
                        <button onClick={() => reset()} className="text-xs uppercase tracking-[0.3em] text-accent hover:underline">Ver todo el catálogo</button>
                    </div>
                )}
            </div>
        </section>
    );
}