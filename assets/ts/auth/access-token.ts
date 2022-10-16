import { navigateTo } from "#imports";

export async function tradeCodeForToken(code: string, redirectUrl: string) {
    // login() only returns a code challenge. This function turns the code challenge into an auth-token

    const codeVerifier = localStorage.getItem("code-verifier");
    if (codeVerifier === null) {
        throw new Error("missing code-verifier for fetching access token");
    }

    const grant = {
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUrl, // required for verification, but no actual redirect
        client_id: "20aa48c2719e42c0be5f3b834942f06d",
        code_verifier: codeVerifier,
    };

    const tokenRequest = fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams(Object.entries(grant)).toString(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    tokenRequest.then(response => response.json()).then(async (answer) => {
        if (answer.error) {
            await handleLoginError("Spotify Authorization error: " + JSON.stringify(answer));
            return;
        }

        localStorage.setItem("auth-token", answer.access_token);
        localStorage.setItem("refresh-token", answer.refresh_token);
        await refreshAccessToken(); // because first access token is apperantly invalid
        await navigateTo("/home");
    });
    tokenRequest.catch(handleLoginError);
    tokenRequest.finally(resetAuthStorage);

    await tokenRequest;
}

export function resetAuthStorage() {
    localStorage.removeItem("code-verifier");
    localStorage.removeItem("auth-state");
    localStorage.removeItem("redirect-uri");
}

export async function handleLoginError(msg: string) {
    console.error(msg);
    await navigateTo({
        path: "/error",
        query: {
            "redirect-uri": "/login",
        },
    });
}

export async function refreshAccessToken() {
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
        },
    });

    tokenRequest.then(response => response.json().then((answer) => {
        if (answer.error) {
            console.warn("access Token refresh failed: " + JSON.stringify(answer));
            navigateTo("/login");
            return;
        }

        localStorage.setItem("auth-token", answer.access_token);
        localStorage.setItem("refresh-token", answer.refresh_token);
        setTimeout(() => refreshAccessToken(), (answer.expires_in - 100) * 1000);
    }));
    tokenRequest.catch((error) => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("refresh-token");
        console.warn("access Token refresh failed (network error): " + error);
        navigateTo("/login");
    });

    await tokenRequest;
}
