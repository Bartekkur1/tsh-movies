import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";

export default interface MovieRepository {
    saveMovie(movie: Movie): Promise<void>;
    findMovies(movieSo: MovieSO): Promise<Movie[]>;
}