import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";
import MovieRepository from "./types";
import { CollectionChain } from "lodash";
import { asClass, AwilixContainer } from "awilix";

export class LowdbMovieRepository implements MovieRepository {

    private moviesCollection: CollectionChain<Movie>;

    constructor(moviesCollection: CollectionChain<Movie>) {
        this.moviesCollection = moviesCollection;
    }

    saveMovie(movie: Movie): Promise<void> {
        movie.id = this.generateNewMovieId();
        throw new Error("Method not implemented.");
    }

    findMovies(movieSo: MovieSO): Movie[] {
        throw new Error("Method not implemented.");
    }

    generateNewMovieId(): number {
        const newestMovie = this.moviesCollection.orderBy("id", "desc").find().value();
        return newestMovie === undefined ? 1 : newestMovie.id + 1;
    }
}

export const registerLowdbMovieRepository = (container: AwilixContainer): void => {
    container.register({
        movieRepository: asClass(LowdbMovieRepository).singleton()
    });
};