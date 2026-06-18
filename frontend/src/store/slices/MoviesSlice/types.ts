export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    id: number;
    title: string;
    description: string;
    rating: number;
    lengthMinutes: number;
    posterUrl: string;
    year: number;
    genres: Genre[];
    relatedMovies: Movie[];
}