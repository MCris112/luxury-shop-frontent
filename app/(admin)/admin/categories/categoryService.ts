import { fetchJson, fetchJsonPost } from "@/core/fetch-json";
import { Category, CategoryStore } from "./category.types";
import parseApi from "@/core/parse-api";

export async function fetchCategoryList() {
    return fetchJson<Category[]>(parseApi("categories"));
}

export async function fetchCategoryStore(category: CategoryStore) {
    return fetchJsonPost<Category>(parseApi("categories"), category)
}