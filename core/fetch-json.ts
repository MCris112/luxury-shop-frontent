async function handleResponse<T>(res: Response, url: string): Promise<T> {
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url} - ${res.status} ${res.statusText}`);
    }

    const text = await res.text();
    if (!text) return {} as T;

    try {
        return JSON.parse(text);
    } catch (error) {
        console.warn(`Failed to parse JSON response from ${url}:`, error);
        return {} as T;
    }
}


export async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);
    return handleResponse<T>(res, url);
}

export async function fetchJsonPost<T>(url: string, data: any): Promise<T> {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return handleResponse<T>(res, url);
}

export async function fetchJsonPut<T>(url: string, data: any): Promise<T> {
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return handleResponse<T>(res, url);
}

export async function fetchJsonDelete<T>(url: string): Promise<T> {
    const res = await fetch(url, {
        method: "DELETE",
    });
    return handleResponse<T>(res, url);
}