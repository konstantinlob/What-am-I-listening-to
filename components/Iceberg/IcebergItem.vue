<template>
    <div class="w-10 h-fit">
        <img :src="props.img" class="w-10 h-10 object-cover">
        <p class="whitespace-nowrap overflow-hidden txt" :class="{'text-spotify-black': overwater, 'text-white': !overwater}">
            {{ props.text }}
        </p>
    </div>
</template>

<script lang="ts" setup>
    interface Props {
        img: string,
        text: string,
        overwater?: boolean
    };

    const props = defineProps<Props>();
</script>

<style scoped>
    .txt {
        font-size: x-small;
    }
</style>
