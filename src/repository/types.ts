import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";

interface MovieRepository {
    saveMovie(movie: Movie): Promise<void>;
    findMovies(movieSo: MovieSO): Movie[];
    generateNewMovieId(): number;
    genresExists(genres: string[]): boolean;
}

export default MovieRepository;