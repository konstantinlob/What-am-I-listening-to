<template>
    <main class="bg-spotify-black h-screen w-screen text-white">
        <NuxtPage />
    </main>
</template>

<script setup lang="ts">
    import { refreshAccessToken } from "./assets/ts/auth";
    refreshAccessToken();
</script>
