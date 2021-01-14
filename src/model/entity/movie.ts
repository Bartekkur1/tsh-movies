import { Genre } from "./genres";

export default interface Movie {
    id: number;
    title: string;
    year: number;
    runtime: number;
    genres: Genre[];
    director: string;
    actors: string;
    plot: string;
    posterUrl: string;
}