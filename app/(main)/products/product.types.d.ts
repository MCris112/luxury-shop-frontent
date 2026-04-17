import { Category } from "@/app/(admin)/admin/categories/category.types";

export interface Product {
    id: string;
    name: string;
    information: string;
    content: string;

    price: number;
    image: string;

    categories: Category[];
}

export interface ProductStore {
    name: string;
    slug: string;
    information: string;
    content: string;

    price: number;
    image: string;

    categories: string[];
}