<script lang="ts" setup>
    import { request } from "~/assets/ts/api";
    import { TopArtists } from "~/assets/ts/api/types/me";
    import { Artist } from "~/assets/ts/api/types/generell";

    const topArtists: Artist[] = [];

    let url: string | null = "/me/top/artists";

    while (url != null) {
        const data: TopArtists = await request<TopArtists>({
            endpoint: url,
            query: {
                limit: 50,
            },
        });
        topArtists.push(...data.items);
        url = data.next;
    }

    const artistIndex: {[name: string]: Artist} = {};

    for (const artist of topArtists) {
        if (artistIndex[artist.name] === undefined) {
            artistIndex[artist.name] = artist;
        }
    }

    const artists: Artist[] = Object.values(artistIndex);

    console.log(artists);
</script>

<template>
    <div class="w-full h-full">
        <p>Top Artists</p>
        <StatisticsIceberg
            :items="artists.map((artist) => ({
                info: artist.name,
                imageSrc: artist.images[0]?.url,
                level: artist.popularity,
            }))"
        />
    </div>
</template>
