'use client';

import PageHeader from "@/components/admin/PageHeader";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { useConfirm } from "@/components/admin/ConfirmDialog";
import { Product } from "./product.types";
import { fetchProductDelete } from "./productService";

export default function ProductContent({ data }: { data: Product[] }) {
    const [products, setProducts] = useState<Product[]>(data);
    const confirm = useConfirm();

    const handleDelete = async (id: string) => {
        await confirm({
            title: "Eliminar Producto",
            description: "¿Está seguro de que desea eliminar este producto de la colección? Esta acción es permanente.",
            confirmLabel: "Eliminar",
            cancelLabel: "Mantener",
            variant: "danger",
            onConfirm: async () => {
                try {
                    await fetchProductDelete(id);
                    setProducts(products.filter(p => p.id !== id));
                    toast.success("Producto eliminado");
                } catch (error) {
                    toast.error("Error al eliminar producto");
                    throw error;
                }
            }
        });
    };



    return (
        <>
            <PageHeader
                title="Productos"
                subtitle="Gestionar la Colección Editorial"
                actionLabel="Añadir Producto"
                href="/admin/products/create"
                actionIcon={Plus} />

            <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-sm overflow-hidden">
                <div className="p-4 border-b border-black/5 flex justify-between items-center">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar catálogo..."
                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-sans pl-10" />
                    </div>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black/5">
                            <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Producto</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Información</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Precio</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {products.map((p) => (
                            <tr key={p.id} className="hover:bg-white/60 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <Image src={p.image} alt={p.name} width={100} height={100} className="w-12 h-12 bg-muted-bg rounded-sm flex-shrink-0" />
                                        <span className="font-serif text-lg">{p.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-sans text-muted-fg">
                                    {p.information}
                                </td>
                                <td className="px-6 py-4 text-sm font-sans font-medium">{p.price}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/admin/products/${p.id}/edit`}
                                            className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                                        >
                                            <Edit2 size={14} className="text-muted-fg" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-400"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}