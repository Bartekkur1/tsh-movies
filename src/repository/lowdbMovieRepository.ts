import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";
import MovieRepository from "./types";
import { CollectionChain } from "lodash";
import { asClass, AwilixContainer } from "awilix";

export class LowdbMovieRepository implements MovieRepository {

    private moviesCollection: CollectionChain<Movie>;
    private genresCollection: CollectionChain<string>;

    constructor(moviesCollection: CollectionChain<Movie>, genresCollection: CollectionChain<string>) {
        this.genresCollection = genresCollection;
        this.moviesCollection = moviesCollection;
    }

    genresExists(genres: string[]): boolean {
        const savedGenres = this.genresCollection.value();
        for (const genre of genres) {
            if (!savedGenres.includes(genre))
                return false;
        }
        return true;
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
        movieRepository: asClass<MovieRepository>(LowdbMovieRepository).singleton()
    });
};