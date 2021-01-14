import { Genre } from "./entity/genres";
import Movie from "./entity/movie";

interface DbSchema {
    movies: Movie[];
    genres: Genre[];
}

export default DbSchema;