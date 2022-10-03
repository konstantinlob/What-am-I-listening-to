<template>
    <div>
        <div v-if="playbackState" class="bg-spotify-green bg-opacity-50">
            <div v-if="playbackState.item">
                <div class="flex h-16 justify-start">
                    <div class="h-full p-1">
                        <img class="max-h-full" :src="playbackState.item.album.images[0]?.url" alt="" />
                    </div>
                    <div class="my-auto">
                        <p class="text-white">
                            {{ playbackState.item.name }}
                        </p>
                        <p class="text-gray">
                            {{ playbackState.item.artists.map(a => a.name).join(', ') }}
                        </p>
                    </div>
                    <div class="my-auto w-24 text-center self-center">
                        <div v-if="me.product === 'premium' || true" class="flex align-baseline justify-evenly">
                            <button @click="skipToPrevious()">⏮</button>
                            <button @click="playOrPause()">⏯</button>
                            <button @click="skipToNext()">⏭</button>
                        </div>
                        <p>{{ mstime2string(playbackState.progress_ms) }} / {{ mstime2string(playbackState.item.duration_ms) }}</p>
                    </div>
                </div>
                <!-- progress bar -->
                <div class="h-1 relative">
                    <div class="absolute bg-gray h-full w-full"></div>
                    <div class="absolute bg-white h-full"
                        :style="{width: `${playbackState.progress_ms / playbackState.item.duration_ms * 100}%`}">
                    </div>
                </div>
            </div>
            <div v-else class="text-center h-16">
                Ad is playing
            </div>
        </div>
        <div v-if="error">
            Miniplayer failed: {{ error.message }}
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { request } from '~/assets/ts/api';
    import { PlaybackState, Me } from './types';

    let playbackState = useState<PlaybackState>();
    let error = useState<any>();
    let me = await request<Me>({
        endpoint: '/me',
    }).catch(e => error.value = e);
    let refetchId = useState<NodeJS.Timeout>();

    fetchPlaybackState();

    function mstime2string(ms: number){
        if(typeof ms !== 'number'){
            return "~:~";
        }
        let seconds = Math.floor(ms / 1000);
        let minutes = Math.floor(seconds / 60);
        return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
    }

    // data-fetch functions

    function fetchPlaybackState() {
        if(refetchId.value){
            clearTimeout(refetchId.value);
        }
        refetchId.value = null;
        request<PlaybackState>({
            endpoint: '/me/player',
            query: {
                additional_types: 'track',
                market: me.country,
            }
        }).then(data => {
            playbackState.value = data;
        }).catch(error => {
            console.error(error)
        }).finally(() => {
            refetchId.value = setTimeout(() => fetchPlaybackState(), 500);  // delay needs maybe to be adjusted (eg 500)
        });
    }

    // miniplayer control functions

    function skipToPrevious() {
        request({
            endpoint: '/me/player/previous',
            method: 'POST',
        }).catch(error => {
            alert(error.message);
        });
    }

    function playOrPause() {
        if(!playbackState.value.is_playing){
            // start/resume
            request({
                endpoint: '/me/player/play',
                method: 'PUT',
                query: {
                    device_id: playbackState.value.device.id,
                }
            }).catch(error => {
                alert(error.message);
            });
        } else {
            // stop/pause
            request({
                endpoint: '/me/player/pause',
                method: 'PUT',
                query: {
                    device_id: playbackState.value.device.id,
                }
            }).catch(error => {
                alert(error.message);
            });
        }
    }

    function skipToNext(){
        request({
            endpoint: '/me/player/next',
            method: 'POST'
        }).catch(error => {
            alert(error.message);
        });
    }
</script>
