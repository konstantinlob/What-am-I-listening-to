<template>
    <section class="flex flex-col justify-center items-center">
        <h1 class="text-[28px] pb-6">Your Favorite Genres</h1>
        <Doughnut :doughnut-data="genres" :width="360" :height="360" />
        <p class="text-gray">We found out what genres you like</p>
    </section>
</template>

<script lang="ts" setup>
    import Doughnut from "~/assets/vue/Doughnut.vue";
    import { toTitleCase } from "~/assets/ts/helpers";
    import { request } from "~/assets/ts/api";
    import { TopArtists } from "~/assets/ts/api/types";
    import { Timeframe, timeRange } from "~/assets/ts/enums";

    const activeTimeframe = useState<Timeframe>("activeTimeframe").value;

    const topArtists = await request<TopArtists>({
        endpoint: "/me/top/artists",
        query: {
            time_range: timeRange[activeTimeframe],
        },
    }).catch(console.error);

    interface Genre {
        name: string,
        count: number,
    }
    const genres: Genre[] = [];
    topArtists?.items?.forEach(artist => artist.genres.forEach((genre) => {
        genre = toTitleCase(genre);
        const existingGenre = genres.find(existingGenre => existingGenre.name === genre);
        if (existingGenre) {
            existingGenre.count++;
        } else if (genres.length < 20) { // due to limited amount of colors
            genres.push({ name: genre, count: 1 });
        }
    }));
</script>
