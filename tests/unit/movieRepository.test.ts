import { AwilixContainer } from "awilix";
import { LowdbClient } from "../../src/container/lowdbClient";
import MovieRepository from "../../src/repository/types";
import { mockContainer } from "../mock/mockContainer";


describe("Movie repository", () => {

    let movieRepository: MovieRepository;
    let container: AwilixContainer;
    let lowdbClient: LowdbClient;

    beforeAll(async () => {
        container = await mockContainer();
        movieRepository = container.resolve<MovieRepository>("movieRepository");
        lowdbClient = container.resolve<LowdbClient>("lowdb");
    });

    it("generates proper next movie id", () => {
        const moviesCount = lowdbClient.getAdapter().get("movies").size().value();
        const generatedId = movieRepository.generateNewMovieId();
        expect(generatedId).toBe(moviesCount + 1);
    });
});