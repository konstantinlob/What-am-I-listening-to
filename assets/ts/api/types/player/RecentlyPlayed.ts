export interface RecentlyPlayed {
    href: string,
    items: [{
        context: null,
        played_at: string,
        track: Track,
    }],
    limit: number,
    next: string | null,
    cursors: {
        after: string,
    },
    total: number,
}

export interface Track {
    album: Album,
    artists: [Artist],
    available_markets: [string],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: {
        isrc: string,
    },
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number,
    preview_url: string | null,
    track_number: number,
    type: "track",
    uri: string,
}

export interface Album {
    album_type: string,
    artists: [Artist],
    available_markets: [string],
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    images: [{
        url: string,
        height: string,
        width: string,
    }],
    name: string,
    release_date: string,
    release_date_precision: "year" | "month" | "day",
    total_tracks: number,
    type: "album",
    uri: string,
}

export interface Artist {
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    name: string,
    type: "artist",
    uri: string,
}
