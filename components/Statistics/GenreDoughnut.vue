<template>
    <section class="w-full h-full flex flex-col justify-center items-center">
        <h1 class="text-[30px] pb-6">Your Favorite Genres</h1>
        <Doughnut :doughnut-data="genres" />
    </section>
</template>

<script lang="ts" setup>
    import Doughnut from "~/assets/vue/Doughnut.vue";
    import { request } from "~/assets/ts/api";
    import { TopArtists } from "~/assets/ts/api/types";
    import { Timeframe } from "~/assets/ts/enums";

    const activeTimeframe = useState<Timeframe>("activeTimeframe").value;
    const topArtists = {
        [Timeframe.Month]: await request<TopArtists>({ endpoint: "/me/top/artists", query: { time_range: "short_term" } }),
        [Timeframe.HalfYear]: await request<TopArtists>({ endpoint: "/me/top/artists", query: { time_range: "medium_term" } }),
        [Timeframe.Year]: await request<TopArtists>({ endpoint: "/me/top/artists", query: { time_range: "long_term" } }),
    };

    interface Genre {
        name: string,
        count: number,
    }
    const genres: Genre[] = [];
    topArtists[activeTimeframe].items.forEach(artist => artist.genres.forEach((genre) => {
        if (genres.length >= 20) { // due to limited amount of colors
            return;
        }

        if (genres.some(existingGenre => existingGenre.name === genre)) {
            // @ts-ignore
            genres.find(existingGenre => existingGenre.name === genre).count++;
        } else {
            genres.push({ name: genre, count: 1 });
        }
    }));
</script>
