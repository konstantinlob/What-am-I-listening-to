interface requestParameter {
    endpoint: string,
    query?: object,
    body?: object,
    method?: 'GET' | 'POST' | 'PUT',
    headers?: object
}


export async function request<dataType>({endpoint, query, body, method, headers}: requestParameter): Promise<dataType> {
    const auth = localStorage.getItem('auth-token');
    if(!auth){
        throw Error('not logged in')
    }

    const url = new URL(`https://api.spotify.com/v1${endpoint}`);
    if(query){
        for(let [key, value] of Object.entries(query)){
            url.searchParams.append(key, value)
        }
    }

    return fetch(url, {
        method: method ?? 'GET',
        headers: {
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json',
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then(response => {
        // if(!response.ok){
        //     response.json().then(data => console.error(data))
        //     throw Error(`${endpoint} failed with ${response.status}`)
        // }
        return response.json()
    }).then((data) => {
        if(data.error){
            throw data.error;
        }
        return data;
    })
}
