export type RickAndMortyApiCharacters = {
    info: CharactersInfo;
    results: Character[];
}

export type CharactersInfo = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

type Origin = {
    name: string;
    url: string;
}

type Location = {
    name: string;
    url: string;
}
