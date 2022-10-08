import { Track } from "../generell";

export interface RecentlyPlayed {
    href: string,
    items: {
        context: null,
        played_at: string,
        track: Track,
    }[],
    limit: number,
    next: string | null,
    cursors: {
        after: string,
    },
    total: number,
}
