import PageHeader from "@/components/admin/PageHeader";
import ProductForm from "../ProductForm";

export default function CreateProductPage() {
    return (
        <div className="space-y-12">
            <PageHeader 
                title="Nuevo Producto" 
                subtitle="Catalogar una nueva pieza en la colección editorial" 
            />
            
            <ProductForm />
        </div>
    );
}
