<template>
    <nav class="h-12 w-full bg-gray p-1 relative">
        <div class="h-full w-full relative">
            <SpotifyLogo class="nav-element left-1" />
            <WailtLogo class="nav-element left-[50%] translate-x-[-50%]" />
            <button class="nav-element no-tap-highlight right-1" @click="toggleMenu">
                <img :src="me.images[0]?.url ?? defaultAvatar" alt="user" class="h-full w-auto">
            </button>
        </div>
        <NavbarMenu v-if="isMenuVisible" class="absolute right-0 top-12 rounded-bl-md" />
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
        @apply h-full w-auto absolute
    }

    .no-tap-highlight {
        -webkit-tap-highlight-color: transparent;
    }
</style>
