import { fetchJson, fetchJsonPost } from "@/core/fetch-json";
import parseApi from "@/core/parse-api";
import { User } from "./user.types";

export async function fetchUserList() {
    return fetchJson<User[]>(parseApi("users"))
}

export async function userStore(user: User) {
    return fetchJsonPost<User>(parseApi("users"), user)
}