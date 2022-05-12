export type RickAndMortyApiEpisodes = {
    info: EpisodesInfo;
    results: Episode[];
}

export type EpisodesInfo = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export type Episode = {
    id: number;
    name: string;
    'air_date': string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}
