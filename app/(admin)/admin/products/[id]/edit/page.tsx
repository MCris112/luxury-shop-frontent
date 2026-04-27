import PageHeader from "@/components/admin/PageHeader";
import ProductForm from "../../ProductForm";
import { notFound } from "next/navigation";
import { fetchProductById } from "../../productService";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    let product;
    try {
        product = await fetchProductById(id);
    } catch (error) {
        return notFound();
    }

    if (!product) return notFound();

    return (
        <div className="space-y-12">
            <PageHeader
                title="Editar Producto"
                subtitle={`Modificando detalles de: ${product.name}`}
            />

            <ProductForm initialData={product} isEditing />
        </div>
    );
}
