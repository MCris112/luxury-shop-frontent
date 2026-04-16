import { fetchJson } from "@/core/fetch-json";
import { Category } from "./category.types";
import parseApi from "@/core/parse-api";

export async function fetchCategoryList() {
    return fetchJson<Category[]>(parseApi("categories"));
}