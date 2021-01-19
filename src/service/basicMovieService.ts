import { asClass, AwilixContainer } from "awilix";
import MovieDto from "../model/dto/MovieDto";
import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";
import MovieRepository from "../repository/types";
import MovieService from "./types";

export class BasicMovieService implements MovieService {

    private movieRepository: MovieRepository;

    constructor(movieRepository: MovieRepository) {
        this.movieRepository = movieRepository;
    }

    findRandomMovie(): Movie {
        return this.movieRepository.findRandomMovie();
    }

    async saveMovie(movie: MovieDto): Promise<void> {
        await this.movieRepository.saveMovie(movie);
    }

    findMovies(movieSo: MovieSO): Movie[] {
        return this.movieRepository.findMovies(movieSo);
    }

    genresExists(genres: string[]): boolean {
        return this.movieRepository.genresExists(genres);
    }
}

export const registerMovieService = (container: AwilixContainer): void => {
    container.register({
        movieService: asClass(BasicMovieService).singleton()
    });
};