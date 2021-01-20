import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";
import MovieRepository from "./types";
import { CollectionChain } from "lodash";
import { asClass, AwilixContainer } from "awilix";
import { matchedGenres } from "../util/movieUtil";

export class LowdbMovieRepository implements MovieRepository {

    private moviesCollection: CollectionChain<Movie>;
    private genresCollection: CollectionChain<string>;

    constructor(moviesCollection: CollectionChain<Movie>, genresCollection: CollectionChain<string>) {
        this.genresCollection = genresCollection;
        this.moviesCollection = moviesCollection;
    }

    findRandomMovie(): Movie {
        const moviesCount = this.moviesCollection.size().value();
        const randomIndex = Math.floor(Math.random() * moviesCount);
        return this.moviesCollection.find(m => m.id === randomIndex).value();
    }

    genresExists(genres: string[]): boolean {
        // Warning! 
        // not efficient solution! not sure if I should take this every time from db or could I use locally defined values or cache
        const savedGenres = this.genresCollection.value();
        for (const genre of genres) {
            if (!savedGenres.includes(genre.trim()))
                return false;
        }
        return true;
    }

    async saveMovie(movie: Movie): Promise<void> {
        movie.id = this.generateNewMovieId();
        await this.moviesCollection.push(movie).write();
    }

    findMovies(movieSo: MovieSO): Movie[] {
        const genres = movieSo.genres || [];
        const duration = movieSo.duration || 0;

        if (movieSo.genres?.length === 0 && !Number.isNaN(movieSo.duration)) {
            return this.findRandomMovieByRuntime(duration);
        }
        else if (movieSo.genres?.length !== 0 && Number.isNaN(movieSo.duration)) {
            return this.findMoviesByGenres(genres);
        }
        else if (movieSo.genres?.length !== 0 && !Number.isNaN(movieSo.duration)) {
            return this.findMoviesByGenresAndRuntime(genres, duration);
        }
        return [];
    }

    private findRandomMovieByRuntime(duration: number): Movie[] {
        const moviesCollectionAroundRuntime = this.searchMovies(false, undefined, duration);
        const moviesCount = moviesCollectionAroundRuntime.length;
        if (moviesCount === 0)
            throw new Error("Movies collection is empty!");

        const randomIndex = Math.floor(Math.random() * moviesCount);
        const randomMovie = moviesCollectionAroundRuntime[randomIndex];

        return [randomMovie];
    }

    private findMoviesByGenres(genres: string[]): Movie[] {
        return this.searchMovies(true, genres);
    }

    private findMoviesByGenresAndRuntime(genres: string[], duration: number): Movie[] {
        return this.searchMovies(true, genres, duration);
    }

    private searchMovies(sort: boolean, genres?: string[], duration?: number): Movie[] {
        let moviesCollection = this.moviesCollection;
        if (genres) {
            moviesCollection = moviesCollection.filter(m => matchedGenres(m.genres, genres) > 0);
        }
        if (duration !== undefined) {
            moviesCollection = moviesCollection.filter(m => {
                return m.runtime >= (duration - 10) && m.runtime <= (duration + 10);
            });
        }
        if (sort && genres) {
            moviesCollection = moviesCollection.sort((a, b) => matchedGenres(b.genres, genres) - matchedGenres(a.genres, genres));
        }
        return moviesCollection.value();
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