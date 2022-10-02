<template>
    <div v-if="playbackState">
        <div v-if="playbackState.item">
            <div>
                <img :src="playbackState.item.album.images[0].url" alt="" />
            </div>
            <div>
                <p>{{ playbackState.item.name }}</p>
                <p>{{ playbackState.item.artists[0].name }}</p>
            </div>
            <div v-if="me.product === 'premium'">
                <button @click="skipToPrevious()">⏮</button>
                <button @click="playOrPause()">⏯</button>
                <button @click="skipToNext()">⏭</button>
            </div>
            <div>
                <p>{{ mstime2string(playbackState.progress_ms) }} / {{ mstime2string(playbackState.item.duration_ms) }}</p>
            </div>
        </div>
        <div v-else>
            Ad is playing
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { request } from '~/assets/ts/api';
    import { PlaybackState, Me } from './types';

    let playbackState = useState<PlaybackState>();
    let me = await request<Me>({
        endpoint: '/me',
    });
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
            refetchId.value = setTimeout(() => fetchPlaybackState(), 1000);  // delay needs maybe to be adjusted (eg 500)
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
