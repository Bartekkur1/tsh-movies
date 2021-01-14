import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";
import MovieRepository from "./types";
import { CollectionChain } from "lodash";
import { LowdbClient } from "../container/lowdbClient";
import { asClass, AwilixContainer } from "awilix";

export class LowdbMovieRepository implements MovieRepository {

    private moviesCollection: CollectionChain<Movie>;

    constructor(lowdb: LowdbClient) {
        const adapter = lowdb.getAdapter();
        this.moviesCollection = adapter.get("movies");
    }

    saveMovie(movie: Movie): void {
        throw new Error("Method not implemented.");
    }

    findMovies(movieSo: MovieSO): Movie[] {
        throw new Error("Method not implemented.");
    }
}

export const registerLowdbMovieRepository = (container: AwilixContainer): void => {
    container.register({
        movieRepository: asClass(LowdbMovieRepository).singleton()
    });
};