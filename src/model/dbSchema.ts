import { Genre, GenresArray } from "./entity/genres";
import Movie from "./entity/movie";

interface DbSchema {
    movies: Movie[];
    genres: Genre[];
}

const databaseDefaults = (): DbSchema => {
    const defaultGenres = GenresArray.map(s => s as Genre);
    return {
        genres: defaultGenres,
        movies: []
    };
};

export { DbSchema, databaseDefaults };