import { fetchJsonPost } from "@/core/fetch-json";
import { Cart, Order, OrderStore } from "./shop.types";
import parseApi from "@/core/parse-api";
import { DateTime } from "luxon";

export function orderStore(data: OrderStore) {

    data.createdAt = DateTime.now().toISODate();

    return fetchJsonPost<Order>(parseApi("orders"), data);
}