<template>
    <section class="w-full h-full flex flex-col justify-center items-center">
        <h1 class="text-[30px] pb-6">Your Top Tracks Analysed</h1>
        <StatisticsRadarChart :data="data" />
    </section>
</template>

<script lang="ts" setup>
    import { request } from "~/assets/ts/api";
    import { TopTracks } from "~/assets/ts/api/types";
    import { ManyAudioFeatures } from "~/assets/ts/api/types";

    enum Timeframe {
        Month,
        HalfYear,
        Year,
    }
    const activeTimeframe = useState<Timeframe>("activeTimeframe");

    function getTimeRange(){
        if(activeTimeframe.value === Timeframe.Month){
            return "short_term"
        } else if(activeTimeframe.value === Timeframe.HalfYear) {
            return "medium_term"
        } else if(activeTimeframe.value === Timeframe.Year){
            return "long_term"
        } else {
            return "medium_term"
        }
    }

    const topTracks = await request<TopTracks>({
        endpoint: "/me/top/tracks",
        query: {
            limit: 50,
            time_range: getTimeRange(),  // short_term | medium_term | long_term
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
    }

    let total = 0;
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
        total += 1;
        Object.keys(features).forEach((key) => {
            features[key] += audioFeatures[key];
        });
    });

    const data = Object.entries(features).map(
        ([key, value]) => ({ name: key.toUpperCase(), value: value / total }),
    );
</script>
