import { AwilixContainer } from "awilix";
import { LowdbClient } from "../../src/container/lowdbClient";
import MovieService from "../../src/service/types";
import { mockContainer } from "../mock/mockContainer";
import mockMovie from "../mock/mockMovie";

describe("Movie service", () => {

    let container: AwilixContainer;
    let movieService: MovieService;
    let lowdbClient: LowdbClient;

    beforeAll(async () => {
        container = await mockContainer();
        movieService = container.resolve<MovieService>("movieService");
        lowdbClient = container.resolve<LowdbClient>("lowdb");
    });

    it("Save movie", () => {
        const beforeAdditionMovieCount = lowdbClient.getAdapter().get("movies").value().length;
        expect(() => movieService.saveMovie(mockMovie)).not.toThrow();
        const afterAdditionMovieCount = lowdbClient.getAdapter().get("movies").value().length;
        expect(beforeAdditionMovieCount).toBeLessThan(afterAdditionMovieCount);
    });
});