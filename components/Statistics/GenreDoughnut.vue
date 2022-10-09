<template>
    <section class="w-full h-full flex flex-col justify-center items-center">
        <h1 class="text-[30px] pb-6">Your Favoite Genres</h1>
        <Doughnut :genres="genres" />
    </section>
</template>

<script lang="ts" setup>
    import Doughnut from "~/assets/vue/Doughnut.vue";
    import { request } from "~/assets/ts/api";
    import { TopArtists } from "~/assets/ts/api/types";

    interface Genre {
        name: string,
        count: number,
    }
    const genres: Genre[] = [];
    const topArtists = await request<TopArtists>({ endpoint: "/me/top/artists" });
    topArtists.items.forEach(artist => artist.genres.forEach((genre) => {
        if (genres.some(existingGenre => existingGenre.name === genre)) {
            // @ts-ignore
            genres.find(existingGenre => existingGenre.name === genre).count++;
        }
        genres.push({ name: genre, count: 1 });
    }));
</script>
