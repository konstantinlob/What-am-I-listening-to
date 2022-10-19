<script lang="ts" setup>
    import { tradeCodeForToken, handleLoginError, resetAuthStorage } from "~/assets/ts/auth";

    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const error = params.get("error");
    const redirectUrl = localStorage.getItem("redirect-uri");

    if (params.get("state") !== localStorage.getItem("auth-state")) {
        handleLoginError("State missmatch. The authorization integrity might have been compormized!");
    } else if (error) {
        // user clicked cancel
        if (error === "access_denied") {
            resetAuthStorage();
            await navigateTo("/login");
        } else {
            handleLoginError("Spotify Authorization error: " + params.get("error"));
        }
    } else if (!code || redirectUrl === null) {
        handleLoginError("Missing pkce or redirect-uri");
    } else {
        // further redirect happens in this function
        await tradeCodeForToken(code, redirectUrl);
    }
</script>
