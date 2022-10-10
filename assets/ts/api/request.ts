interface requestParameter {
    endpoint: string,
    query?: object,
    body?: object,
    method?: "GET" | "POST" | "PUT",
    headers?: object
}

export async function rawRequest({ endpoint, query, body, method, headers }: requestParameter) {
    const auth = localStorage.getItem("auth-token");
    if (!auth) {
        throw new Error("not logged in");
    }

    const url = new URL(`https://api.spotify.com/v1${endpoint}`);
    if (query) {
        Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, value));
    }

    // TODO: catch 429 and make retries

    const response = await fetch(url, {
        method: method ?? "GET",
        headers: {
            Authorization: `Bearer ${auth}`,
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    return response;
}

export async function request<DataType>(parameters: requestParameter, noContent: any = null): Promise<DataType> {
    return await rawRequest(parameters).then((response) => {
        if (response.status === 204) { // 204 No-Content
            return noContent;
        } else {
            return response.json();
        }
    }).then<DataType>((data) => {
        if (data?.error) {
            // throw for .catch
            throw data.error;
        }
        return data;
    });
}
