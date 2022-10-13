export interface Artist {
    external_urls: {
        spotify: string,
    },
    followers: {
        href: null,
        total: number,
    },
    genres: string[],
    href: string,
    id: string,
    images: Array<{
        url: string,
        height: number,
        width: number,
    }>,
    name: string,
    popularity: number,
    type: "artist",
    uri: string,
};
