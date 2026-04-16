import { environment } from "./environments";

export default function parseApi(url: string, filters: Record<string, any> = {}) {
    const urlWithFilters = new URL(`${environment.api.url}/v1/${url}`);

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            urlWithFilters.searchParams.append(key, String(value));
        }
    });

    return urlWithFilters.toString();
}