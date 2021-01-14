import { asClass, AwilixContainer } from "awilix";
import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";
import MovieRepository from "../repository/types";
import MovieService from "./types";

export class BaseMovieService implements MovieService {

    private movieRepository: MovieRepository;

    constructor(movieRepository: MovieRepository) {
        this.movieRepository = movieRepository;
    }

    public saveMovie(movie: Movie): void {
        throw new Error("Method not implemented.");
    }

    findMovies(movieSo: MovieSO): Movie[] {
        throw new Error("Method not implemented.");
    }
}

export const registerMovieService = (container: AwilixContainer): void => {
    container.register({
        movieService: asClass(BaseMovieService).singleton()
    });
};