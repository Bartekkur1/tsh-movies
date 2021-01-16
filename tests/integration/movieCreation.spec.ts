import { LowdbClient } from "../../src/container/lowdbClient";
import { mockContainer } from "../mock/mockContainer";
import { AwilixContainer } from "awilix";
import request from "supertest";
import { mockMovie } from "../mock/mockMovies";

describe("Movie creation rest api", () => {

    let container: AwilixContainer;
    let lowdbClient: LowdbClient;
    let app: any;

    const getMoviesCount = () => lowdbClient.getAdapter().get("movies").size().value();

    const addMovieAndExpectError = (movie: any, errorMessage: string) => {
        request(app)
            .put("/api/movie")
            .send(movie)
            .end((err, res) => {
                expect(res.status).toBe(400);
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toBe(errorMessage);
            });
    };

    const addMovieAndExpectMoviesCountIncreased = (movie: any) => {
        const beforeMovieCount = getMoviesCount();
        request(app)
            .put("/api/movie")
            .send(movie)
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(beforeMovieCount).toBeLessThan(getMoviesCount());
            });
    };

    beforeAll(async () => {
        container = await mockContainer();
        lowdbClient = container.resolve<LowdbClient>("lowdb");
        app = container.resolve("app");
    });

    afterEach(async () => {
        await lowdbClient.clearDatabase();
    });

    it("save movie", async () => {
        addMovieAndExpectMoviesCountIncreased(mockMovie);
    });

    // - a list of genres (only predefined ones from db file) (required, array of predefined strings)
    it("try to save movie with unknown genres results in error", () => {
        addMovieAndExpectError({ ...mockMovie, genres: ["Invalid", "Genres"] }, "Movie contains unknown genres!");
    });

    it("try to save movie with empty genres results in error", () => {
        addMovieAndExpectError({ ...mockMovie, genres: [] }, "Movie genres cannot be empty!");
    });

    it("try to save movie without genres results in error", () => {
        const movieWihtoutGenres = mockMovie as any;
        delete movieWihtoutGenres["genres"];
        addMovieAndExpectError(movieWihtoutGenres, "Movie must contain genres!");
    });

    // - title (required, string, max 255 characters)
    it("try to save movie without title results in error", () => {
        const movieWithoutTitle = mockMovie as any;
        delete movieWithoutTitle["title"];
        addMovieAndExpectError(movieWithoutTitle, "Movie title is required!");
    });

    it("try to save movie with empty title results in error", () => {
        addMovieAndExpectError({ ...mockMovie, title: "" }, "Movie title cannot be empty!");
    });

    it("try to save movie with too long title results in error", () => {
        const toolongTitle = "tooloooong".repeat(30);
        addMovieAndExpectError({ ...mockMovie, title: toolongTitle }, "Movie title is too long!");
    });

    // - year (required, number)

    it("try to save movie without year results in error", () => {
        const movieWihtoutYear = mockMovie as any;
        delete movieWihtoutYear["year"];
        addMovieAndExpectError(movieWihtoutYear, "Movie year is required!");
    });

    it("try to save movie with year as string results in error", () => {
        addMovieAndExpectError({ ...mockMovie, year: "trust_me_Im_a_year" }, "Movie title must be a number!");
    });

    // - runtime (required, number)

    it("try to save movie without runtime results in error", () => {
        const movieWithoutRuntime = mockMovie as any;
        delete movieWithoutRuntime["runtime"];
        addMovieAndExpectError(movieWithoutRuntime, "Movie runtime is required!");
    });

    it("try to save movie with runtime as string results in error", () => {
        addMovieAndExpectError({ ...mockMovie, runtime: "trust_me_Im_a_runtime" }, "Movie runtime must be a number!");
    });

    // - director (required, string, max 255 characters)

    it("try to save movie without director results in error", () => {
        const movieWithoutDirector = mockMovie as any;
        delete movieWithoutDirector["director"];
        addMovieAndExpectError(movieWithoutDirector, "Movie director is required!");
    });

    it("try to save movie with too long director results in error", () => {
        const directorName = "Too Long John".repeat(20);
        addMovieAndExpectError({ ...mockMovie, director: directorName }, "Movie director is too long!");
    });

    // - actors (optional, string)

    it("Save movie without actors and expects to save it", () => {
        const movieWithoutActors = mockMovie as any;
        delete movieWithoutActors["actors"];
        addMovieAndExpectMoviesCountIncreased(movieWithoutActors);
    });

    // - plot (optional, string)

    it("Save movie without plot and expects to save it", () => {
        const movieWithoutPlot = mockMovie as any;
        delete movieWithoutPlot["plot"];
        addMovieAndExpectMoviesCountIncreased(movieWithoutPlot);
    });

    // - posterUrl (optional, string)

    it("Save movie without posterUrl and expects to save it", () => {
        const movieWithoutPosterUrl = mockMovie as any;
        delete movieWithoutPosterUrl["posterUrl"];
        addMovieAndExpectMoviesCountIncreased(movieWithoutPosterUrl);
    });

});