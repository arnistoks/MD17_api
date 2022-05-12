export type RickAndMortyApiLocations = {
    info: LocationsInfo;
    results: Location[];
}

export type LocationsInfo = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export type Location = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
}
