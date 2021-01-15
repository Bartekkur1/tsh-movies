import { Genre, GenresArray } from "./entity/genres";
import Movie from "./entity/movie";
import { CollectionChain } from "lodash";

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

type MoviesCollection = CollectionChain<Movie>;
type GenresCollection = CollectionChain<Movie>;

export { DbSchema, databaseDefaults, MoviesCollection, GenresCollection };