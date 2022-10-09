interface requestParameter {
    endpoint: string,
    query?: object,
    body?: object,
    method?: "GET" | "POST" | "PUT",
}

export function request<dataType>({ endpoint, query, body, method }: requestParameter): Promise<dataType> {
    const auth = localStorage.getItem("auth-token");
    if (!auth) {
        navigateTo("/login");
        throw new Error("missing authorization token");
    }

    const url = new URL(`https://api.spotify.com/v1${endpoint}`);
    if (query) {
        Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, value));
    }

    return fetch(url, {
        method: method ?? "GET",
        headers: {
            Authorization: `Bearer ${auth}`,
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        if (response.status === 403) {
            navigateTo("/login");
            throw new Error("Recieved '403 Forbidden' response from Spotify");
        }
        return response.text();
    }).then<dataType>((data) => {
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    });
}
