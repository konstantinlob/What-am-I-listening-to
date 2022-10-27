<template>
    <section class="flex flex-col items-center justify-center">
        <h1 class="statistics-title text-center">Artists Popularity Iceberg</h1>
        <Iceberg class="w-[300px] h-[500px]" :data="orderedItems" />
    </section>
</template>

<script lang="ts" setup>
    import { normalizeToFixedLength, shuffleArray } from "~/assets/ts/helpers";
    import { request } from "~/assets/ts/api";
    import { Artist, TopArtists } from "~/assets/ts/api/types";
    import { Timeframe, timeRange } from "~/assets/ts/enums";

    const topArtists: TopArtists = await request<TopArtists>({
        endpoint: "/me/top/artists",
        query: {
            time_range: timeRange[useState<Timeframe>("activeTimeframe").value],
            limit: 50,
        },
    });
    const popularityTiers: Artist[][] = [[], [], [], [], [], [], []];
    topArtists.items.forEach((artist) => {
        if (artist.popularity > 90) {
            popularityTiers[0].push(artist);
        } else if (artist.popularity > 80) {
            popularityTiers[1].push(artist);
        } else if (artist.popularity > 70) {
            popularityTiers[2].push(artist);
        } else if (artist.popularity > 60) {
            popularityTiers[3].push(artist);
        } else if (artist.popularity > 50) {
            popularityTiers[4].push(artist);
        } else if (artist.popularity > 40) {
            popularityTiers[5].push(artist);
        } else {
            popularityTiers[6].push(artist);
        }
    });

    popularityTiers[0] = normalizeToFixedLength(popularityTiers[0], 1);
    popularityTiers[1] = normalizeToFixedLength(popularityTiers[1], 3);
    popularityTiers[2] = normalizeToFixedLength(popularityTiers[2], 4);
    [3, 4, 5, 6].forEach((row) => {
        popularityTiers[row] = normalizeToFixedLength(popularityTiers[row], 5);
    });

    const orderedItems = popularityTiers
        .map(tier => shuffleArray(tier))
        .flat()
        .flatMap(artist => artist === null ? null : { img: artist.images[0].url, text: artist.name });
</script>

<style scoped>
.statistics-title {
    font-size: min(30px, 8vw);
}
</style>
