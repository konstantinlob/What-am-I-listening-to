<template>
    <div class="bg-gray z-[1] min-w-[100px] p-2">
        <p>
            Logged in as {{ props.me.display_name }}
        </p>
        <Nuxt-Link to="/logout" class="no-tap-highlight">
            <img src="~/assets/images/logout-icon.png" alt="" class="h-5 inline-block">
            <span>
                Logout
            </span>
        </Nuxt-Link>
    </div>
</template>

<script lang="ts" setup>
    import { Me } from "~/assets/ts/api/types";

    const props = defineProps<{me: Me}>();
</script>

<style scoped>
    .no-tap-highlight {
        -webkit-tap-highlight-color: transparent;
    }
</style>
