<template>
    <div>
        <div>
            <p>{{ playbackState.item.name }}</p>
            <p>{{ playbackState.device.name }}</p>
        </div>
        <div>
            <span @click="skipToPrevious()">⏮</span>
            <span @click="playOrPause()">⏯</span>
            <span @click="skipToNext()">⏭</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { request } from '~/assets/ts/api';
    import { PlaybackState } from './types'

    var playbackState = await request<PlaybackState>({
        endpoint: '/me/player'
    })

    function skipToPrevious(){
        request({
            endpoint: '/me/player/previous',
            method: 'POST'
        })
    }

    async function playOrPause(){
        if(!playbackState.is_playing){
            // start/resume
            request({
                endpoint: '/me/player/play',
                method: 'PUT',
                query: {
                    device_id: playbackState.device.id
                }
            })
        } else {
            // stop/pause
            request({
                endpoint: '/me/player/pause',
                method: 'PUT',
                query: {
                    device_id: playbackState.device.id
                }
            })
        }

        playbackState = await request<PlaybackState>({
            endpoint: '/me/player'
        })
    }

    function skipToNext(){
        request({
            endpoint: '/me/player/next',
            method: 'POST'
        })
    }
</script>
