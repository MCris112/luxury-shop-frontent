import { environment } from "./environments";

export default function parseApi(url: string) {
    return `${environment.api.url}/v1/${url}`
}