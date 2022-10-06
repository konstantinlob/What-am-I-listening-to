<template>
    <section class="w-full h-full flex justify-center items-center">
        <div class="relative w-[200px] h-[200px]">
            <template v-for="genre in genres" :key="genre.name">
                <div
                    class="absolute-center w-full h-full rounded-full"
                    :style="{
                        'background': `conic-gradient(rgba(0,0,0,0) ${genre.startingPosition}turn, ${genre.color} ${genre.startingPosition}turn ${genre.startingPosition + genre.percent}turn, rgba(0,0,0,0) ${genre.startingPosition + genre.percent}turn 1turn)`,
                        }"
                ></div>
            </template>
        </div>
    </section>
</template>

<script lang="ts" setup>

    interface Genre {
        name: string,
        color: string,
        percent: number,
        startingPosition: number,
    };
    const genres: Array<Genre> = [
        {
            name: "Hip-hop",
            color: "#eb3d34",
            percent: 0.3333,
            startingPosition: 0,
        },
        {
            name: "Rock",
            color: "#34d9eb",
            percent: 0.6666,
            startingPosition: 0.3333,
        },
    ];
</script>

<style scoped>
    .absolute-center{
        @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    }
</style>
