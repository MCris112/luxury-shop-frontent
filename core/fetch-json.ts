export async function fetchJson<T>(url: string): Promise<T> {

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    return res.json();
}

export async function fetchJsonPost<T>(url: string, data: any): Promise<T> {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return res.json();
}

export async function fetchJsonPut<T>(url: string, data: any): Promise<T> {
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return res.json();
}

export async function fetchJsonDelete<T>(url: string): Promise<T> {
    const res = await fetch(url, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return res.json();
}