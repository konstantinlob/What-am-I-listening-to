<script lang="ts" setup>
    import pkceChallenge from "pkce-challenge";
    import GithubBlack from "~/assets/svg/Github_Logo_Black.svg?component";
    import SpotifyWhite from "~/assets/svg/Spotify_Logo_White.svg?component";

    if (localStorage.getItem("auth-token") !== null) {
        navigateTo("/home");
    }

    const clientId = "20aa48c2719e42c0be5f3b834942f06d";
    // https://developer.spotify.com/documentation/general/guides/authorization/scopes/
    const scopes: string[] = [
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        // 'app-remote-control',
        // 'streaming',
        // 'playlist-read-private',
        // 'playlist-read-collaborative',
        // 'user-follow-read',
        // 'user-read-playback-position',
        "user-top-read",
        // 'user-read-recently-played',
        // 'user-library-read',
        "user-read-private", // needed to check if account is free or premium
    ];

    function generateRamdomHexString(len: number = 15): string {
        const arr = new Uint8Array(len / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, num => num.toString(16).padStart(2, "0")).join("");
    }

    async function login() {
        const router = useRouter(); // used to include the baseUrl
        const redirectUri = new URL(router.resolve("/auth").href, window.location.href); // this parameter needs to approved in the Spotify Developer Dashboard
        localStorage.setItem("redirect-uri", redirectUri.toString()); // save for /auth endpoint

        const state = generateRamdomHexString();
        localStorage.setItem("auth-state", state);

        const pkce = pkceChallenge();
        localStorage.setItem("code-verifier", pkce.code_verifier); // save for PKCE code challenge verification

        const url = new URL("/authorize", "https://accounts.spotify.com/");
        url.searchParams.append("client_id", clientId);
        url.searchParams.append("response_type", "code");
        url.searchParams.append("redirect_uri", redirectUri.toString());
        url.searchParams.append("scope", scopes.join(" "));
        url.searchParams.append("state", state);
        url.searchParams.append("code_challenge_method", "S256");
        url.searchParams.append("code_challenge", pkce.code_challenge);
        navigateTo(url.toString(), { external: true });
    }
</script>

<template>
    <div class="flex flex-col items-center justify-between h-full">
        <div class="flex flex-col items-center justify-evenly grow">
            <div>
                <h1 class="flex justify-center text-xl font-bold">What Am I Listening To?</h1>
                <h2 class="flex justify-center">Analyze your listening habits</h2>
            </div>
            <div class="flex flex-col items-center">
                <button class="bg-spotify-green px-8 py-4 h-min rounded-lg flex flex-row items-center font-bold" @click="login()">
                    <SpotifyWhite class="h-10 w-auto" />
                    <span class="pl-2 text-[25px]">login</span>
                </button>
                <span class="flex items-center">Secured by OAuth2.0</span>
            </div>
        </div>
        <div class="flex flex-col items-center">
            <a href="https://github.com/konstantinlob/What-am-I-listening-to#readme" class="bg-purple px-4 py-2 h-min rounded-lg flex flex-row items-center font-bold" target="_blank">
                <GithubBlack class="h-8 w-auto" />
                <span class="pl-2 text-[20px]">GitHub repo</span>
            </a>
            <span class="text-center w-full">Developled by <br> Benjamin Tallarek, Julius Jänchen, Konstantin Lobmayr, Pascal Heyn, Robin Walter</span>
        </div>
    </div>
</template>
