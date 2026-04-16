'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/app/(main)/products/product.types";
import { Category } from "@/app/(admin)/admin/categories/category.types";
import { fetchCategoryList } from "@/app/(admin)/admin/categories/categoryService";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchProductStore, fetchProductUpdate } from "@/app/(main)/products/productService";

interface ProductFormProps {
    initialData?: Product;
    isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing }: ProductFormProps) {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Product>({
        defaultValues: initialData || {
            name: "",
            information: "",
            content: "",
            price: 0,
            image: "",
            categories: []
        }
    });

    const selectedCategories = watch("categories") || [];

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchCategoryList();
                setCategories(data);
            } catch (error) {
                toast.error("Error al cargar categorías");
            } finally {
                setIsLoadingCategories(false);
            }
        }
        loadCategories();
    }, []);

    const toggleCategory = (category: Category) => {
        const isSelected = selectedCategories.find(c => c.id === category.id);
        if (isSelected) {
            setValue("categories", selectedCategories.filter(c => c.id !== category.id));
        } else {
            setValue("categories", [...selectedCategories, category]);
        }
    };

    const onSubmit = async (data: Product) => {
        setIsSubmitting(true);
        try {
            if (isEditing && initialData?.id) {
                await fetchProductUpdate(initialData.id, data);
                toast.success("Producto actualizado correctamente");
            } else {
                await fetchProductStore(data);
                toast.success("Producto creado correctamente");
            }
            router.push("/admin/products");
            router.refresh();
        } catch (error) {
            toast.error("Error al guardar el producto");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Basic Info */}
                <div className="space-y-8">
                    <h2 className="text-xl font-serif border-b border-black/5 pb-4">Información Básica</h2>
                    
                    <Input 
                        label="Nombre del Producto" 
                        placeholder="Ej: Anillo Celestial" 
                        {...register("name", { required: "El nombre es obligatorio" })}
                        error={errors.name?.message}
                    />

                    <Input 
                        label="Información Breve" 
                        placeholder="Descripción corta para la lista" 
                        {...register("information", { required: "La información breve es obligatoria" })}
                        error={errors.information?.message}
                    />

                    <Input 
                        label="Precio" 
                        type="number" 
                        placeholder="Ej: 5000" 
                        {...register("price", { required: "El precio es obligatorio", valueAsNumber: true })}
                        error={errors.price?.message}
                    />

                    <Input 
                        label="URL de Imagen" 
                        placeholder="https://..." 
                        {...register("image", { required: "La imagen es obligatoria" })}
                        error={errors.image?.message}
                    />
                </div>

                {/* Categorization */}
                <div className="space-y-8">
                    <h2 className="text-xl font-serif border-b border-black/5 pb-4">Categorización</h2>
                    
                    <div className="space-y-4">
                        <label className="text-xs uppercase tracking-widest text-muted-fg font-sans">
                            Seleccionar Categorías
                        </label>
                        
                        {isLoadingCategories ? (
                            <div className="text-xs animate-pulse font-sans">Cargando categorías...</div>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {categories.map((category) => {
                                    const isSelected = selectedCategories.some(c => c.id === category.id);
                                    return (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => toggleCategory(category)}
                                            className={`px-4 py-2 text-xs uppercase tracking-widest font-sans transition-all border ${
                                                isSelected 
                                                ? "bg-foreground text-background border-foreground" 
                                                : "bg-transparent text-muted-fg border-black/10 hover:border-black/30"
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="pt-4">
                         <label className="text-xs uppercase tracking-widest text-muted-fg font-sans mb-4 block">
                            Descripción Detallada (Contenido)
                        </label>
                        <textarea 
                            className="w-full bg-white/40 backdrop-blur-md border border-black/10 p-4 font-sans text-sm focus:ring-0 focus:border-accent min-h-[150px]"
                            placeholder="Describa el producto en detalle..."
                            {...register("content")}
                        />
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-black/5 flex justify-end gap-6">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium border border-black/10 hover:bg-black/5 transition-all"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-4 bg-foreground text-background uppercase tracking-[0.2em] text-xs font-medium hover:bg-black/80 transition-all disabled:opacity-50"
                >
                    {isSubmitting ? "Guardando..." : (isEditing ? "Actualizar Producto" : "Crear Producto")}
                </button>
            </div>
        </form>
    );
}
