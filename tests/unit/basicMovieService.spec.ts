import { BasicMovieService } from "../../src/service/basicMovieService";
import MovieRepository from "../../src/repository/types";
import MovieService from "../../src/service/types";
import { instance, mock, verify } from "ts-mockito";
import { mockMovie } from "../mock/mockMovies";

describe("Basic movie service", () => {

    let movieService: MovieService;
    let movieRepository: MovieRepository;

    beforeAll(async () => {
        movieRepository = mock<MovieRepository>();
        movieService = new BasicMovieService(instance(movieRepository));
    });

    it("Save movie", () => {
        movieService.saveMovie(mockMovie);
        verify(movieRepository.saveMovie(mockMovie)).called();
    });

    it("Genres doesnt exists", () => {
        const invalidGenres = ["Invalid", "Genres"];
        expect(movieService.genresExists(invalidGenres)).toBeFalsy();
    });

    it("Should call repository methods when checking movie genres", () => {
        const genres: string[] = ["For", "Sure", "Genre"];
        movieService.genresExists(genres);
        verify(movieRepository.genresExists(genres)).called();
    });
});