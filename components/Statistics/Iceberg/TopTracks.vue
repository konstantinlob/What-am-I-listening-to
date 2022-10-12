<script lang="ts" setup>
    import { request } from "~/assets/ts/api";
    import { TopTracks } from "~/assets/ts/api/types/me";
    import { Track } from "~/assets/ts/api/types/generell";

    const topTracks: Track[] = [];

    let url: string | null = "/me/top/tracks";

    while (url != null) {
        const data: TopTracks = await request<TopTracks>({
            endpoint: url,
            query: {
                limit: 50,
            },
        });
        topTracks.push(...data.items);
        url = data.next;
    }

    const trackIndex: {[name: string]: Track} = {};

    for (const track of topTracks) {
        if (trackIndex[track.name] === undefined) {
            trackIndex[track.name] = track;
        }
    }

    const tracks: Track[] = Object.values(trackIndex);
</script>

<template>
    <section class="w-full h-full flex flex-col justify-center items-center">
        <h1 class="text-[30px] pb-6">Top Tracks</h1>
        <StatisticsIceberg
            :items="tracks.map((track) => ({
                info: track.name,
                imageSrc: track.album.images[0]?.url,
                level: track.popularity,
            }))"
        />
    </section>
</template>
