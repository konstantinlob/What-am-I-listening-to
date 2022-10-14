<script lang="ts" setup>
    import IcebergBackground from "~/assets/svg/Iceberg.svg?component";
    import { normalizeToFixedLength, shuffleArray } from "~/assets/ts/helpers";
    import { request } from "~/assets/ts/api";
    import { Artist, TopArtists } from "~/assets/ts/api/types";
    import { Timeframe, timeRange } from "~/assets/ts/enums";

    const response: TopArtists = await request<TopArtists>({
        endpoint: "/me/top/artists",
        query: {
            time_range: timeRange[useState<Timeframe>("activeTimeframe").value],
            limit: 50,
        },
    });
    const popularityTiers: Artist[][] = [[], [], [], [], [], [], []];
    response.items.forEach((artist) => {
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
        .flat().flatMap(artist => artist === null ? null : artist.images[0].url);
</script>

<template>
    <section class="flex flex-col w-full h-full">
        <h1 class="text-[30px] pb-6 text-center">Your Favorite Artists on the Popularity Iceberg</h1>
        <div class="w-full grow relative">
            <IcebergBackground class="absolute h-full w-full" />
            <img v-if="orderedItems[0]" :src="orderedItems[0]" class="overWaterAlbumCover left-[35%] top-[10%]">
            <img v-if="orderedItems[1]" :src="orderedItems[1]" class="overWaterAlbumCover left-[25%] top-[20%]">
            <img v-if="orderedItems[2]" :src="orderedItems[2]" class="overWaterAlbumCover left-[40%] top-[20%]">
            <img v-if="orderedItems[3]" :src="orderedItems[3]" class="overWaterAlbumCover left-[55%] top-[20%]">
            <img v-if="orderedItems[4]" :src="orderedItems[4]" class="overWaterAlbumCover left-[15%] top-[30%]">
            <img v-if="orderedItems[5]" :src="orderedItems[5]" class="overWaterAlbumCover left-[32%] top-[30%]">
            <img v-if="orderedItems[6]" :src="orderedItems[6]" class="overWaterAlbumCover left-[48%] top-[30%]">
            <img v-if="orderedItems[7]" :src="orderedItems[7]" class="overWaterAlbumCover left-[65%] top-[30%]">
            <div class="absolute inset-x-[10%] top-[38%] bottom-0 grid grid-cols-5 grid-rows-4 place-items-center">
                <template v-for="(item, index) in orderedItems.slice(8, 29)" :key="index + item">
                    <img v-if="item" :src="item" class="w-10 h-10">
                </template>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .overWaterAlbumCover {
        @apply absolute w-10 h-10
    }
</style>
