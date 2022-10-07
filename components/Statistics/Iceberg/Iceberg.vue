<script lang="ts" setup>
    import Iceberg from "~/assets/svg/Iceberg.svg?component";
    import { request } from "~/assets/ts/api";
    import { RecentlyPlayed, Track } from "~/assets/ts/api/types/player";
    import GridGenerator from "./grid-generator";

    const recentlyPlayed: Track[] = [];

    let url: string | null = "/me/player/recently-played";

    while (url != null) {
        const data: RecentlyPlayed = await request<RecentlyPlayed>({
            endpoint: url,
            query: {
                limit: 50,
            },
        });
        recentlyPlayed.push(...data.items.map(v => v.track));
        url = data.next;
    }

    const trackIndex: {[name: string]: Track} = {};

    for (const track of recentlyPlayed) {
        if (trackIndex[track.name] === undefined) {
            trackIndex[track.name] = track;
        }
    }

    const tracks: Track[] = Object.values(trackIndex);

    const grid = new GridGenerator(10);

</script>

<template>
    <div class="w-full h-full relative">
        <Iceberg class="absolute h-full w-full" />
        <img
            v-for="track in tracks"
            class="absolute w-[10%] h-auto"
            :style="grid.getNext(track.popularity)"
            :src="track.album.images[0]?.url"
            :title="track.name"
        >
    </div>
</template>
