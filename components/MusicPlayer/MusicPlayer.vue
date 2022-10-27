<template>
    <div>
        <div v-if="playbackState" class="bg-spotify-green bg-opacity-50 rounded-t-md">
            <div v-if="playbackState.item">
                <div class="flex h-16 justify-start">
                    <div class="h-full p-1">
                        <img class="max-h-full" :src="playbackState.item.album.images[0]?.url" alt="Album Cover">
                    </div>
                    <div class="my-auto">
                        <p class="text-white">
                            {{ playbackState.item.name }}
                        </p>
                        <p class="text-[#bbb]">
                            {{ playbackState.item.artists.map(a => a.name).join(', ') }}
                        </p>
                    </div>
                    <div class="my-auto w-24 text-center self-center">
                        <div v-if="me.product === 'premium'" class="flex align-baseline justify-evenly">
                            <button @click="skipToPrevious()">⏮</button>
                            <button @click="playOrPause()">⏯</button>
                            <button @click="skipToNext()">⏭</button>
                        </div>
                        <p>{{ mstime2string(songProgress ? songProgress.progress : null) }} / {{ mstime2string(playbackState.item.duration_ms) }}</p>
                    </div>
                </div>
                <!-- progress bar -->
                <div class="h-1 relative overflow-hidden">
                    <div class="absolute bg-gray h-full w-full" />
                    <div
                        class="absolute bg-white h-full"
                        :style="{width: `${songProgress.percent * 100}%`}"
                    />
                </div>
            </div>
            <div v-else class="text-center h-16">
                Ad is playing
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { request } from "~/assets/ts/api";
    import { PlaybackState, Me } from "~/assets/ts/api/types/";

    interface Progress {
        progress: number,
        percent: number,
        fetched: number,
    }

    const playbackState = useState<PlaybackState | null>(() => null);
    const me = await request<Me>({
        endpoint: "/me",
    });
    const songProgress = useState<Progress>(() => ({ progress: 0, percent: 0, fetched: 0 }));

    let interval: NodeJS.Timer;

    onBeforeMount(() => {
        fetchPlaybackState();
        interval = setInterval(updateProgress, 250);
    });

    onBeforeUnmount(() => {
        clearInterval(interval);
    });

    // utility functions and other

    function mstime2string(ms: number | null) {
        if (ms === null) {
            return "~:~";
        }
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
    }

    function updateProgress() {
        const state = playbackState.value;
        if (!(state?.progress_ms && state?.item?.duration_ms)) {
            return;
        }

        let progress = state.progress_ms;

        if (state.is_playing) {
            progress = state.progress_ms + (Date.now() - songProgress.value.fetched);
        }

        progress = Math.min(progress, state.item.duration_ms);

        songProgress.value = {
            progress,
            percent: progress / state.item?.duration_ms,
            fetched: songProgress.value.fetched,
        };
    }

    // data-fetch functions

    function fetchPlaybackState() {
        request<PlaybackState | null>({
            endpoint: "/me/player",
            query: {
                additional_types: "track",
                market: me.country,
            },
        }).then((data) => {
            playbackState.value = data;
            songProgress.value.fetched = Date.now(); // support for progress calculation
            setTimeout(() => fetchPlaybackState(), 2500);
        }).catch((error) => {
            console.error(error);
            setTimeout(() => fetchPlaybackState(), 10000);
        });
    }

    // miniplayer control functions

    function skipToPrevious() {
        request({
            endpoint: "/me/player/previous",
            method: "POST",
        }).catch((error) => {
            alert(error.message);
        });
    }

    function playOrPause() {
        if (playbackState.value === null) {
            return;
        }

        if (playbackState.value.is_playing) {
            // start/resume
            request({
                endpoint: "/me/player/pause",
                method: "PUT",
                query: {
                    device_id: playbackState.value.device.id,
                },
            }).catch((error) => {
                alert(error.message);
            });
        } else {
            // stop/pause
            request({
                endpoint: "/me/player/play",
                method: "PUT",
                query: {
                    device_id: playbackState.value.device.id,
                },
            }).catch((error) => {
                alert(error.message);
            });
        }
    }

    function skipToNext() {
        request({
            endpoint: "/me/player/next",
            method: "POST",
        }).catch((error) => {
            alert(error.message);
        });
    }
</script>
