import { fetchJson, fetchJsonDelete, fetchJsonPost, fetchJsonPut } from "@/core/fetch-json";
import parseApi from "@/core/parse-api";
import { Product } from "./product.types";

export function fetchProductList(categories?: string[]) {

    console.log(parseApi("products", { categories }))
    return fetchJson<Product[]>(parseApi("products", { categories }))
}

export function fetchProductStore(product: Product) {
    return fetchJsonPost<Product>(parseApi(`products`), product)
}

export function fetchProductUpdate(id: string, product: Product) {
    return fetchJsonPut<Product>(parseApi(`products/${id}`), product)
}

export function fetchProductById(id: string) {
    return fetchJson<Product>(parseApi(`products/${id}`))
}

export function fetchProductDelete(id: string) {
    return fetchJsonDelete<void>(parseApi(`products/${id}`))
}