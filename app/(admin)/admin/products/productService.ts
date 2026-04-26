import { fetchJson, fetchJsonDelete, fetchJsonPost, fetchJsonPut } from "@/core/fetch-json";
import parseApi from "@/core/parse-api";
import { Product, ProductStore } from "./product.types";

export function fetchProductList(categories?: string[], search?: string, minPrice?: number, maxPrice?: number) {
    return fetchJson<Product[]>(parseApi("products", { categories, search, minPrice, maxPrice }))
}

export function fetchProductStore(product: ProductStore) {
    return fetchJsonPost<Product>(parseApi(`products`), product)
}

export function fetchProductUpdate(id: string, product: ProductStore) {
    return fetchJsonPut<Product>(parseApi(`products/${id}`), product)
}

export function fetchProductById(id: string) {
    return fetchJson<Product>(parseApi(`products/${id}`))
}

export function fetchProductDelete(id: string) {
    return fetchJsonDelete<void>(parseApi(`products/${id}`))
}