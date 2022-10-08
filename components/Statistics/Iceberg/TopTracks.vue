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
    <div class="w-full h-full">
        <p>Top Tracks</p>
        <StatisticsIceberg
            :items="tracks.map((track) => ({
                info: track.name,
                imageSrc: track.album.images[0]?.url,
                level: track.popularity,
            }))"
        />
    </div>
</template>
