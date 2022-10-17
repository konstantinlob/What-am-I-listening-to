import { Artist } from "./Artist";

export interface Album {
    album_type: string,
    artists: Artist[],
    available_markets: string[],
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    images: Array<{
        url: string,
        height: string,
        width: string,
    }>,
    name: string,
    release_date: string,
    release_date_precision: "year" | "month" | "day",
    total_tracks: number,
    type: "album",
    uri: string,
}
