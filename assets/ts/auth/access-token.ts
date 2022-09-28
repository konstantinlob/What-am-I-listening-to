import { navigateTo } from "#imports";

export function tradeCodeForToken(code: string, redirectUrl: URL) {
    // login() only returns a code challenge. This function turns the code challenge into an auth-token
    const grant = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUrl.toString(), // required, but not used for redirect
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

    tokenRequest.then(response => response.json().then(answer => {
        if (answer.error) {
            handleLoginError("Spotify Authorization error: " + JSON.stringify(answer));
            return;
        }
        
        localStorage.setItem("auth-token", answer.access_token);
        localStorage.setItem("refresh-token", answer.refresh_token);
        setTimeout(() => refreshAccessToken(), (answer.expires_in - 100) * 1000);
        navigateTo("/home");
    }));
    tokenRequest.catch(error => handleLoginError(error));
    tokenRequest.finally(() => {
        localStorage.removeItem("code-verifier");
        localStorage.removeItem("auth-state");
    });
}

export function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh-token");
    if (refreshToken === null) {
        navigateTo("/login");
        return;
    }

    const grant = {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: "20aa48c2719e42c0be5f3b834942f06d",
    };
    const tokenRequest = fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams(grant),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });

    tokenRequest.then(response => response.json().then(answer => {
        if (answer.error) {
            console.warn("access Token refresh failed: " + JSON.stringify(answer));
            navigateTo("/login");
            return;
        }
        
        localStorage.setItem("auth-token", answer.access_token);
        localStorage.setItem("refresh-token", answer.refresh_token);
        setTimeout(() => refreshAccessToken(), (answer.expires_in - 100) * 1000);
    }));
    tokenRequest.catch(error  => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("refresh-token");
        console.warn("access Token refresh failed (network error): " + error);
        navigateTo("/login");
    });
}

export function handleLoginError(msg: string) {
    console.error(msg);
    navigateTo("/error?redirect-uri=/login");
}
