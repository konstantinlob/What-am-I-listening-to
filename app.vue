<template>
    <main class="bg-spotify-black text-white overflow-hidden">
        <NuxtPage />
    </main>
</template>

<script lang="ts" setup>
    import { refreshAccessToken } from "~/assets/ts/auth";
    await refreshAccessToken(); // ensure token is "new" before loading the page
</script>

<style>
body {
    @apply bg-spotify-black
}
</style>
