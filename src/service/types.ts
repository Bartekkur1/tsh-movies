import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";

interface MovieService {
    saveMovie(movie: Movie): Promise<void>;
    findMovies(movieSo: MovieSO): Movie[];
    genresExists(genres: string[]): boolean;
}

export default MovieService;