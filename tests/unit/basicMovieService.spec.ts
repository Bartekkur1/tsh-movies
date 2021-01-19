import { BasicMovieService } from "../../src/service/basicMovieService";
import MovieRepository from "../../src/repository/types";
import MovieService from "../../src/service/types";
import MovieSO from "../../src/model/so/movieSO";
import { mock, verify } from "ts-mockito";
import { mockMovie } from "../mock/mockMovies";

describe("Basic movie service", () => {

    let movieService: MovieService;
    let movieRepository: MovieRepository;

    beforeAll(async () => {
        movieRepository = mock<MovieRepository>();
        movieService = new BasicMovieService(movieRepository);
    });

    it("Save movie", () => {
        movieService.saveMovie(mockMovie);
        verify(movieRepository.generateNewMovieId())
            .calledBefore(movieRepository.saveMovie(mockMovie));
        verify(movieRepository.saveMovie(mockMovie)).called();
    });

    it("Saving invalid movie results in exception", () => {
        const invalidMovie: any = { ...mockMovie, genres: ["Invalid", "Genres"] };
        expect(() => movieService.saveMovie(invalidMovie)).toThrowError();
        verify(movieRepository.saveMovie(invalidMovie)).never();
        verify(movieRepository.generateNewMovieId()).never();
    });

    it("Search movies", () => {
        const movieSo: MovieSO = { duration: 10, genres: ["Action", "Adventure"] };
        movieService.findMovies(movieSo);
        verify(movieRepository.findMovies(movieSo)).called();
    });

    it("Searching movie by invalid genres results in exception", () => {
        const movieSo: any = { duration: 10, genres: ["Invalid", "Genres"] };
        expect(() => movieService.findMovies(movieSo)).toThrowError();
        verify(movieRepository.findMovies(movieSo)).never();
    });

    it("Should call repository methods when checking movie genres", () => {
        const genres: string[] = ["For", "Sure", "Genre"];
        movieService.genresExists(genres);
        verify(movieRepository.genresExists(genres)).called();
    });
});