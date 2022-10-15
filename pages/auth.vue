<script lang="ts" setup>
    import { tradeCodeForToken, handleLoginError } from "~/assets/ts/auth";

    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const redirectUrl = localStorage.getItem("redirect-uri");

    if (params.get("state") !== localStorage.getItem("auth-state")) {
        handleLoginError("State missmatch. The authorization integrity might have been compormized!");
    } else if (params.has("error")) {
        handleLoginError("Spotify Authorization error: " + params.get("error"));
    } else if (!code || redirectUrl === null) {
        handleLoginError("Missing pkce or redirect-uri");
    } else {
        // further redirect happens in this function
        await tradeCodeForToken(code, redirectUrl);
    }
</script>
