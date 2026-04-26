import { fetchJson, fetchJsonDelete, fetchJsonPost, fetchJsonPut } from "@/core/fetch-json";
import parseApi from "@/core/parse-api";
import { Order } from "./order.types";

export function fetchOrderList() {
    return fetchJson<Order[]>(parseApi("orders"))
}

export function fetchOrderById(id: number | string) {
    return fetchJson<Order>(parseApi(`orders/${id}`))
}

export function fetchOrderDelete(id: number | string) {
    return fetchJsonDelete<void>(parseApi(`orders/${id}`))
}

export function fetchOrderUpdate(id: number | string, order: Partial<Order>) {
    return fetchJsonPut<Order>(parseApi(`orders/${id}`), order)
}