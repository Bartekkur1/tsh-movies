import { BasicMovieService } from "../../src/service/basicMovieService";
import MovieRepository from "../../src/repository/types";
import MovieService from "../../src/service/types";
import MovieSO from "../../src/model/so/movieSO";
import { mock, verify } from "ts-mockito";
import mockMovie from "../mock/mockMovie";

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

    it("Search movies", () => {
        const movieSo: MovieSO = { duration: 10, genres: ["Action", "Adventure"] };
        movieService.findMovies(movieSo);
        verify(movieRepository.findMovies(movieSo));
    });
});