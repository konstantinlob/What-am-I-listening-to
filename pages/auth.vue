<script lang="ts" setup>
    import { tradeCodeForToken, handleLoginError } from "~/assets/ts/auth";

    const params = new URLSearchParams(window.location.search);
    if (params.get("state") !== localStorage.getItem("auth-state")) {
        handleLoginError("State missmatch. The authorization integrity might have been compormized!");
    } if (params.has("error")) {
        handleLoginError("Spotify Authorization error: " + params.get("error"));
    } else {
        const redirectUrl = new URL(window.location.href);
        redirectUrl.search = "";
        tradeCodeForToken(params.get("code"), redirectUrl);
    }
</script>
