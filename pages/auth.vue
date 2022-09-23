<script setup>
    // login() only returns a code challenge. This script turns the code challenge into an auth-token
    const params = new URLSearchParams(window.location.search);
    if (params.has("error")) {
        console.log(params.get("error"));
        let errorUrl = new URL("/error").searchParams.append("redirect-uri", "/login");
        navigateTo(errorUrl);
    }
    
    const form = {
        grant_type: "authorization_code",
        code: params.code,
        redirect_uri: window.location.href, // required, but not used for redirect
        client_id: "20aa48c2719e42c0be5f3b834942f06d",
        code_verifier: localStorage.getItem('code-verifier'),
    };
    
    const url = new URL('/api/token', 'https://accounts.spotify.com/');
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

    if (data.error) {
        console.log(data.error);
        navigateTo("/error?redirect-uri=/login");
    } else {
        localStorage.setItem('auth-token', data.access_token);
        localStorage.setItem('refresh-token', data.refresh_token);
        localStorage.setItem('auth-token-expiration-timestamp', Date.now() + data.expires_in);
        localStorage.removeItem('code-verifier');
    }
    navigateTo('/home');
</script>
