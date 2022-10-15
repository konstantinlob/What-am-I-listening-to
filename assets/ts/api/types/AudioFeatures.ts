export interface AudioFeatures {
    acousticness: number,
    analysis_url: string,
    danceability: number,
    duration_ms: number,
    energy: number,
    id: string,
    instrumentalness: number,
    key: number,
    liveness: number,
    loudness: number,
    mode: 0 | 1, // major: 1 | minor: 0
    speechiness: number,
    tempo: number,
    time_signature: 3 | 4 | 5 | 6 | 7,
    track_href: string,
    type: "audio_features",
    uri: string,
    valence: number,
}

export interface ManyAudioFeatures {
    audio_features: AudioFeatures[],
}
