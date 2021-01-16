import Movie from "./entity/movie";
import { CollectionChain } from "lodash";
import { defaultGenresArray } from "./genres";

interface DbSchema {
    movies: Movie[];
    genres: string[];
}

const databaseDefaults = (): DbSchema => {
    return {
        genres: defaultGenresArray.map(g => g as string),
        movies: []
    };
};

type MoviesCollection = CollectionChain<Movie>;
type GenresCollection = CollectionChain<Movie>;

export { DbSchema, databaseDefaults, MoviesCollection, GenresCollection };