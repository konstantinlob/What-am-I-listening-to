<template>
    <nav class="h-10 p-1 relative">
        <SpotifyLogo class="nav-child p-1 left-1" />
        <WailtLogo class="nav-child left-[50%] translate-x-[-50%]" />
        <button class="nav-child right-1" @click="toggleMenu">
            <img :src="me.images[0]?.url ?? defaultAvatar" alt="user" class="h-full w-auto">
        </button>
        <NavbarMenu v-if="menuVisible" class="absolute right-0 top-12 rounded-l-md" />
    </nav>
</template>

<script lang="ts" setup>
    import { request } from "~/assets/ts/api";
    import { Me } from "~/assets/ts/api/types";
    import SpotifyLogo from "~/assets/svg/Spotify_Logo_White.svg?component";
    import WailtLogo from "~/assets/svg/WAILT_logo.svg?component";
    // @ts-ignore
    import defaultAvatar from "~/assets/svg/default-avatar.svg?inline";

    const menuVisible = useState<boolean>();

    const me = await request<Me>({
        endpoint: "/me",
    });

    function toggleMenu() {
        menuVisible.value = !menuVisible.value;
    }
</script>

<style scoped>
    .nav-child {
        @apply h-full w-auto absolute
    }
</style>
