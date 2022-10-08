import { Track } from "../generell";

export interface TopTracks {
    href: string,
    items: Track[],
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
}
