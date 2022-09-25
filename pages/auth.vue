<script lang="ts" setup>
    // login() only returns a code challenge. This script turns the code challenge into an auth-token
    const params = new URLSearchParams(window.location.search);
    if (params.has("error")) {
        console.log(params.get("error"));
        navigateTo("/error?redirect-uri=/login");
    }
    if (localStorage.getItem("auth-state") != params.get("state")) {
        console.error("State missmatch. The authorization integrity might have been compormized!");
        navigateTo("/error?redirect-uri=/login");
    }

    const currentLocation = new URL(window.location.href);
    currentLocation.search = "";
    const grant = {
        grant_type: "authorization_code",
        code: params.get("code"),
        redirect_uri: currentLocation.toString(), // required, but not used for redirect
        client_id: "20aa48c2719e42c0be5f3b834942f06d",
        code_verifier: localStorage.getItem('code-verifier'),
    };
    const tokenRequest = fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams(grant),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });

    tokenRequest.then(repsonse => repsonse.json().then(answer => {
        if (answer.error) {
            console.error(answer.error);
            navigateTo("/error?redirect-uri=/login");
            return;
        }
        
        localStorage.setItem('auth-token', answer.access_token);
        localStorage.setItem('refresh-token', answer.refresh_token);
        localStorage.setItem('auth-token-expiration-timestamp', (answer.expires_in * 1000 + Date.now()).toString());
        navigateTo('/home');
    }));

    tokenRequest.catch(error => {
        console.error(error);
        navigateTo("/error?redirect-uri=/login");
    });

    tokenRequest.finally(() => {
        localStorage.removeItem("code-verifier");
        localStorage.removeItem("auth-state");
    });
</script>
