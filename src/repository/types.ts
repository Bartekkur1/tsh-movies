import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";

interface MovieRepository {
    saveMovie(movie: Movie): void;
    findMovies(movieSo: MovieSO): Movie[];
    generateNewMovieId(): number;
}

export default MovieRepository;