<script setup>
    import pkceChallenge from 'pkce-challenge';

    const client_id = "20aa48c2719e42c0be5f3b834942f06d";
    const scopes = [];  // https://developer.spotify.com/documentation/general/guides/authorization/scopes/
    const redirect_uri = new URL(window.location);  // this parameter needs to approved by the accountable Spotify Developer
    redirect_uri.search = "";  // clear query parameters

    async function login(){
        const pkce = pkceChallenge();

        // save for pkce post-request
        localStorage.setItem('code-verifier', pkce.code_verifier);

        const url = new URL('/authorize', 'https://accounts.spotify.com/');
        url.searchParams.append('client_id', client_id);
        url.searchParams.append('response_type', 'code');
        url.searchParams.append('redirect_uri', redirect_uri);
        url.searchParams.append('scopes', scopes.join(" "));
        url.searchParams.append('code_challenge_method', 'S256');
        url.searchParams.append('code_challenge', pkce.code_challenge);
        navigateTo(url.toString(), {external: true});  // page redirect
    }

    async function loadToken(){
        // generated in login()
        const code_verifier = localStorage.getItem('code-verifier');

        const url = new URL('/api/token', 'https://accounts.spotify.com/');

        const form = {
            grant_type: "authorization_code",
            code: pkce,
            redirect_uri: redirect_uri,
            client_id: client_id,
            code_verifier: code_verifier,
        };
        
        const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams(form),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });

        const data = await response.json();
        // {
        // "access_token": "NgCXRK...MzYjw",
        // "token_type": "Bearer",
        // "scope": "user-read-private user-read-email",
        // "expires_in": 3600,
        // "refresh_token": "NgAagA...Um_SHo"
        // }

        if(data.error){
            const url = new URL(redirect_uri);
            url.searchParams.append('error', data.error);
            navigateTo(url);
        }else{
            localStorage.setItem('auth-token', data.access_token);
            localStorage.setItem('refresh-token', data.refresh_token);
            localStorage.setItem('auth-token-expiration-timestamp', Date.now() + data.expires_in);
            localStorage.removeItem('code-verifier');
            navigateTo('/');
        }
    }

    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const pkce = params.get('code');
    if(pkce){
        await loadToken();  // wait until loaded
    }
</script>

<template>
    <div class="pageContainer">
        <div class="pageBody">
            <div>
                <h1 class="flex justify-center text-xl font-bold">What Am I Listening To?</h1>
                <h2 class="flex justify-center">Analyze your listening habits</h2>
            </div>
            <div class="flex flex-col items-center">
                <button @click="login()" class="bg-spotify-green px-8 py-4 h-min rounded-lg flex flex-row items-center font-bold">
                    <img src="~/assets/svg/Spotify_Logo_White.svg" alt="Spotify Logo" class="h-10"/>
                    <span class="pl-2 text-[25px]">login</span>
                </button>
                <span class="flex items-center">Secured by OAuth2.0</span>
            </div>
            <p v-if="error">{{ error }}</p>
        </div>
        <div class="flex flex-col items-center">
            <button class="bg-purple px-4 py-2 h-min rounded-lg flex flex-row items-center font-bold">
                <img src="~/assets/svg/Github_Logo_Black.svg" alt="GitHub Logo" class="h-8"/>
                <span class="pl-2 text-[20px]">GitHub repo</span>
            </button>
            <span class="text-center w-full">Developled by <br/> Benjamin Tallarek, Julius Jänchen, Konstantin Lobmayr, Pascal Heyn, Robin Walter</span>
        </div>
    </div>
</template>

<style scoped>
.pageContainer {
    @apply flex flex-col items-center justify-between h-full
}

.pageBody {
    @apply flex flex-col items-center justify-evenly grow
}
</style>
