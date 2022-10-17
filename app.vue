<template>
    <main class="bg-spotify-black h-screen w-screen text-white">
        <NuxtPage />
    </main>
</template>

<script lang="ts" setup>
    import { refreshAccessToken } from "~/assets/ts/auth";
    await refreshAccessToken(); // ensure token is "new" before loading the page
</script>
