import MovieDto from "../model/dto/MovieDto";
import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";

interface MovieService {
    saveMovie(movie: MovieDto): Promise<void>;
    findMovies(movieSo: MovieSO): Movie[];
    findRandomMovie(): Movie;
    genresExists(genres: string[]): boolean;
}

export default MovieService;