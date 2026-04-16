
import { fetchCategoryList } from "@/app/(admin)/admin/categories/categoryService";
import { fetchProductList } from "../../products/productService";
import ProductContent from "../../products/ProductContent";

export default async function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const products = await fetchProductList([slug]);
    const categories = await fetchCategoryList();

    return (
        <div>
            <ProductContent data={products} categories={categories} />
        </div>
    );
}