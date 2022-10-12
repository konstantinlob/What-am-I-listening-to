<script lang="ts" setup>
    import { request } from "~/assets/ts/api";
    import { RecentlyPlayed, Track } from "~/assets/ts/api/types/";

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
</script>

<template>
    <section class="w-full h-full flex flex-col justify-center items-center">
        <h1 class="text-[30px] pb-6">Recently Played Tracks</h1>
        <StatisticsIceberg
            :items="tracks.map((track) => ({
                info: track.name,
                imageSrc: track.album.images[0]?.url,
                level: track.popularity,
            }))"
        />
    </section>
</template>
