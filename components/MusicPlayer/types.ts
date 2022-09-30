export interface PlaybackState {
    device: {
        id: string,
        is_active: boolean,
        is_private_session: boolean,
        is_restricted: boolean,
        name: string,
        type: 'computer' | 'computer' | 'speaker',
        volume_percent: number
    },
    repeat_state: 'off' | 'track' | 'context',
    shuffle_state: 'on' | 'off',
    context: {
        type: 'artist' | 'playlist' | 'album' | 'show',
        href: string,
        external_url: {
            spotify: string
        },
        uri: string
    },
    timestamp: number,
    progress_ms: number | null,
    is_playing: boolean,
    item: {
        album: object,
        artists: [object],
        available_markets: [string],
        disc_number: number,
        duraction_ms: number,
        explicit: boolean,
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        is_playable: boolean,
        linked_from: object
        name: string,
        popularity: number,
        preview_url: string,
        track_number: number,
        type: 'track',
        uri: string,
        is_local: boolean
    },
    currently_playing: 'track' | 'episode' | 'ad' | 'unknown',
    actions: {
        interrupting_playback?: boolean,
        pausing?: boolean,
        resuming?: boolean,
        seeking?: boolean,
        skipping_next?: boolean,
        skipping_prev?: boolean,
        toggling_repeat_context?: boolean,
        toggling_shuffle?: boolean,
        toggling_repeat_track?: boolean,
        transferring_playback?: boolean
    }
}
