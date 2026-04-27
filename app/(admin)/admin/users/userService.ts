import { fetchJson, fetchJsonPost, fetchJsonDelete } from "@/core/fetch-json";
import parseApi from "@/core/parse-api";
import { User, UserStore } from "./user.types";

export async function fetchUserList() {
    return fetchJson<User[]>(parseApi("users"))
}

export async function fetchUserStore(user: UserStore) {
    return fetchJsonPost<User>(parseApi("users"), user)
}

export async function fetchUserDelete(id: string) {
    return fetchJsonDelete(parseApi(`users/${id}`))
}
