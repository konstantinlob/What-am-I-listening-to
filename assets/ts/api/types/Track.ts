import { Album } from "./Album";
import { Artist } from "./Artist";

export interface Track {
    album: Album,
    artists: Artist[],
    available_markets: string[],
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
