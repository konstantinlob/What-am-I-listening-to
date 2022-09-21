<script setup>
    // import { generateCodeVerifier,  generateChallenge } from 'pkce-challenge'
    import pkceChallenge from 'pkce-challenge'

    const client_id = "20aa48c2719e42c0be5f3b834942f06d"
    const scopes = []  // https://developer.spotify.com/documentation/general/guides/authorization/scopes/
    const redirect_uri = new URL(window.location)
    redirect_uri.search = ""  // clear search stuff
    const auth_token = localStorage.getItem('auth-token')

    async function logout(){
        localStorage.removeItem('auth-token')
        navigateTo('/')
    }

    async function login(){
        const pkce = pkceChallenge()

        localStorage.setItem('code-verifier', pkce.code_verifier)

        const url = new URL('/authorize', 'https://accounts.spotify.com/')
        url.searchParams.append('client_id', client_id)
        url.searchParams.append('response_type', 'code')
        url.searchParams.append('redirect_uri', redirect_uri)
        url.searchParams.append('scopes', scopes.join(" "))
        url.searchParams.append('code_challenge_method', 'S256')
        url.searchParams.append('code_challenge', pkce.code_challenge)
        navigateTo(url.toString(), {external: true})
    }

    async function loadToken(){
        const code_verifier = localStorage.getItem('code-verifier')

        const url = new URL('/api/token', 'https://accounts.spotify.com/')
        const form = new FormData()
        form.append('grant_type', "authorization_code")
        form.append('code', pkce)
        form.append('redirect_uri', redirect_uri)
        form.append('client_id', client_id)
        form.append('code_verifier', code_verifier)
        
        const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams(form),  // don't ask. i have no idea
            // headers: {
            //     "Content-Type": "application/x-www-form-urlencoded"
            // }
        })

        const data = await response.json()
        // {
        // "access_token": "NgCXRK...MzYjw",
        // "token_type": "Bearer",
        // "scope": "user-read-private user-read-email",
        // "expires_in": 3600,
        // "refresh_token": "NgAagA...Um_SHo"
        // }

        console.log(data)

        if(data.error){
            const url = new URL(redirect_uri)
            url.searchParams.append('error', data.error)
            navigateTo(url)
        }else{
            localStorage.setItem('auth-token', data.access_token)
            localStorage.setItem('refresh-token', data.refresh_token)
            localStorage.removeItem('code-verifier')
            navigateTo('/')
        }
    }

    function clearCodeVerifier(){
        localStorage.removeItem('code-verifier')
    }

    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')
    const pkce = params.get('code')
    if(pkce){
        loadToken()
    }
</script>

<template>
    <div>
        <div v-if="error">
            <p>Something went wrong</p>
            <p>{{ error }}</p>
        </div>
        <div v-else-if="pkce">
            <p>Fetching access token...</p>
        </div>
        <div v-else>
            <router-link class="text-spotify-green underline" to="/">Go to Homepage</router-link>
            <div v-if="auth_token">
                <button class="text-spotify-green underline" @click="logout">Logout</button>
            </div>
            <div v-else>
                <button class="text-spotify-green underline" @click="login">Login with Spotify</button>
            </div>
        </div>

        <button @click="clearCodeVerifier">Clear Code Verifier</button>
    </div>
</template>
