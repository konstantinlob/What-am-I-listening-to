<template>
    <nav class="h-10 relative">
        <SpotifyLogo class="nav-element left-1" />
        <WailtLogo class="nav-element right-[50%]" />
        <div class="absolute left-[50%] font-bold top-[50%] translate-y-[-50%]">
            WAILT
        </div>
        <button class="nav-element no-tap-highlight right-1" @click="toggleMenu">
            <img :src="me.images[0]?.url ?? defaultAvatar" alt="user" class="h-full w-auto">
        </button>
        <NavbarMenu v-if="isMenuVisible" class="absolute right-0 top-12 rounded-l-md" />
    </nav>
</template>

<script lang="ts" setup>
    import { request } from "~/assets/ts/api";
    import { Me } from "~/assets/ts/api/types";
    import SpotifyLogo from "~/assets/svg/Spotify_Icon_Green.svg?component";
    import WailtLogo from "~/assets/svg/WAILT_logo.svg?component";
    // @ts-ignore
    import defaultAvatar from "~/assets/svg/default-avatar.svg?inline";

    const isMenuVisible = useState<boolean>();

    const me = await request<Me>({
        endpoint: "/me",
    });

    function toggleMenu() {
        isMenuVisible.value = !isMenuVisible.value;
    }
</script>

<style scoped>
    .nav-element {
        @apply h-full w-auto absolute top-1
    }

    .no-tap-highlight {
        -webkit-tap-highlight-color: transparent;
    }
</style>
