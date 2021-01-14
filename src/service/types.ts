import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";

interface MovieService {
    saveMovie(movie: Movie): void;
    findMovies(movieSo: MovieSO): Movie[];
}

export default MovieService;