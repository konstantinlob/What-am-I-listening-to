interface requestParameter {
    endpoint: string,
    query?: object,
    body?: object,
    method?: "GET" | "POST" | "PUT",
    headers?: object
}

export function request<dataType>({ endpoint, query, body, method, headers }: requestParameter): Promise<dataType> {
    const auth = localStorage.getItem("auth-token");
    if (!auth) {
        throw new Error("not logged in");
    }

    const url = new URL(`https://api.spotify.com/v1${endpoint}`);
    if (query) {
        for (const [key, value] of Object.entries(query)) {
            url.searchParams.append(key, value);
        }
    }

    return fetch(url, {
        method: method ?? "GET",
        headers: {
            Authorization: `Bearer ${auth}`,
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then((response) => {
        return response.json();
    }).then<dataType>((data) => {
        if (data.error) {
            // throw for .catch
            throw data.error;
        }
        return data;
    });
}
