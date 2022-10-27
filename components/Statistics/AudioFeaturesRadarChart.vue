<template>
    <section class="flex flex-col justify-center items-center">
        <h1 class="statistics-title">Your Top Tracks Analysed</h1>
        <RadarChart :width="360" :height="360" :data="chartData" />
        <p class="text-gray">We analysed your Top Tracks for audio features</p>
    </section>
</template>

<script lang="ts" setup>
    import RadarChart from "~/assets/vue/RadarChart.vue";
    import { request } from "~/assets/ts/api";
    import { toTitleCase } from "~/assets/ts/helpers";
    import { TopTracks, ManyAudioFeatures } from "~/assets/ts/api/types";
    import { Timeframe, timeRange } from "~/assets/ts/enums";

    const activeTimeframe = useState<Timeframe>("activeTimeframe");

    const topTracks = await request<TopTracks>({
        endpoint: "/me/top/tracks",
        query: {
            limit: 50,
            time_range: timeRange[activeTimeframe.value],
        },
    });

    const trackIds = topTracks.items.map(track => track.id);

    const audioFeatures = await request<ManyAudioFeatures>({
        endpoint: "/audio-features",
        query: {
            ids: trackIds.join(","),
        },
    });

    interface indexable {
        [key: string]: number,
    };

    const features: indexable = {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        liveness: 0,
        // loudness: 0,  // Values typically range between -60 and 0 db
        speechiness: 0,
        // tempo: 0,  // overall BPM
        valence: 0,
    };

    audioFeatures.audio_features.forEach((audioFeatures: any) => {
        Object.keys(features).forEach((key) => {
            features[key] += audioFeatures[key];
        });
    });

    const trackCount = audioFeatures.audio_features.length;

    const chartData = Object.entries(features).map(
        ([featureName, valueSum]) => ({ name: toTitleCase(featureName), value: valueSum / trackCount }),
    );
</script>

<style scoped>
.statistics-title {
    font-size: min(30px, 8vw);
}
</style>
