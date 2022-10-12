<script lang="ts" setup>
    import { request } from "~/assets/ts/api";
    import { TopArtists } from "~/assets/ts/api/types/";
    import { Artist } from "~/assets/ts/api/types/";

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
</script>

<template>
    <section class="w-full h-full flex flex-col justify-center items-center">
        <h1 class="text-[30px] pb-6">Top Artists</h1>
        <StatisticsIceberg
            :items="artists.map((artist) => ({
                info: artist.name,
                imageSrc: artist.images[0]?.url,
                level: artist.popularity,
            }))"
        />
    </section>
</template>
