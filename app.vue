<template>
    <main class="bg-spotify-black absolute inset-0 text-white overflow-hidden">
        <NuxtPage />
    </main>
</template>

<script lang="ts" setup>
    import { refreshAccessToken } from "~/assets/ts/auth";
    await refreshAccessToken(); // ensure token is "new" before loading the page
</script>
