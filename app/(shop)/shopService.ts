import { fetchJsonPost } from "@/core/fetch-json";
import { Cart, Order, OrderStore } from "./shop.types";
import parseApi from "@/core/parse-api";

export function orderStore(data: OrderStore) {
    return fetchJsonPost<Order>(parseApi("orders"), data);
}