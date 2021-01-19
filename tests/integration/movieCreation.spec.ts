import { LowdbClient } from "../../src/container/lowdbClient";
import { mockContainer } from "../mock/mockContainer";
import { AwilixContainer } from "awilix";
import { mockMovie, mockMovies } from "../mock/mockMovies";
import request from "supertest";
import { Logger } from "log4js";
import { instance, mock, verify } from "ts-mockito";

describe("Movie creation rest api", () => {

    let container: AwilixContainer;
    let lowdbClient: LowdbClient;
    let logger: Logger;
    let app: any;

    beforeAll(async () => {
        logger = mock(Logger);
        container = await mockContainer(instance(logger));
        lowdbClient = container.resolve<LowdbClient>("lowdb");
        await lowdbClient.getAdapter().set("movies", mockMovies).write();
        app = container.resolve("app");
    });

    const addMovieAndExpectError = async (movie: any, errorMessage: string): Promise<void> => {
        const response = await request(app)
            .put("/api/movie")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send(movie)
            .expect(400);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe(errorMessage);
        verify(logger.warn("Error: " + errorMessage)).called();
    };

    const addMovieAndDontExpectError = async (movie: any) => {
        await request(app)
            .put("/api/movie")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send(movie)
            .expect(201);
    };

    it("successfully save movie without errors", async () => {
        const beforeMovieCount = lowdbClient.getAdapter().get("movies").size().value();
        const res = await request(app)
            .put("/api/movie")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send(mockMovie);

        expect(res.status).toBe(201);
        expect(beforeMovieCount).toBeLessThan(lowdbClient.getAdapter().get("movies").size().value());
    });

    // - a list of genres (only predefined ones from db file) (required, array of predefined strings)
    it("try to save movie with unknown genres results in error", async () => {
        await addMovieAndExpectError({ ...mockMovie, genres: ["Invalid", "Genres"] }, "Movie contains unknown genres");
    });

    it("try to save movie with empty genres results in error", async () => {
        await addMovieAndExpectError({ ...mockMovie, genres: [] }, "Genres must contain at least 1 items");
    });

    it("try to save movie without genres results in error", async () => {
        const movieWihtoutGenres = Object.assign({}, mockMovie) as any;
        delete movieWihtoutGenres["genres"];
        await addMovieAndExpectError(movieWihtoutGenres, "Genres is required");
    });

    // - title (required, string, max 255 characters)
    it("try to save movie without title results in error", async () => {
        const movieWithoutTitle = Object.assign({}, mockMovie) as any;
        delete movieWithoutTitle["title"];
        await addMovieAndExpectError(movieWithoutTitle, "Title is required");
    });

    it("try to save movie with empty title results in error", async () => {
        await addMovieAndExpectError({ ...mockMovie, title: "" }, "Title is not allowed to be empty");
    });

    it("try to save movie with too long title results in error", async () => {
        const toolongTitle = "tooloooong".repeat(30);
        await addMovieAndExpectError({ ...mockMovie, title: toolongTitle }, "Title length must be less than or equal to 255 characters long");
    });

    it("try to save movie with too long title results in error", async () => {
        await addMovieAndExpectError({ ...mockMovie, title: 123 }, "Title must be a string");
    });

    // - year (required, number)

    it("try to save movie without year results in error", async () => {
        const movieWihtoutYear = Object.assign({}, mockMovie) as any;
        delete movieWihtoutYear["year"];
        await addMovieAndExpectError(movieWihtoutYear, "Year is required");
    });

    it("try to save movie with year as string results in error", async () => {
        await addMovieAndExpectError({ ...mockMovie, year: "trust_me_Im_a_year" }, "Year must be a number");
    });

    // - runtime (required, number)

    it("try to save movie without runtime results in error", async () => {
        const movieWithoutRuntime = Object.assign({}, mockMovie) as any;
        delete movieWithoutRuntime["runtime"];
        await addMovieAndExpectError(movieWithoutRuntime, "Runtime is required");
    });

    it("try to save movie with runtime as string results in error", async () => {
        await addMovieAndExpectError({ ...mockMovie, runtime: "trust_me_Im_a_runtime" }, "Runtime must be a number");
    });

    // - director (required, string, max 255 characters)

    it("try to save movie without director results in error", async () => {
        const movieWithoutDirector = Object.assign({}, mockMovie) as any;
        delete movieWithoutDirector["director"];
        await addMovieAndExpectError(movieWithoutDirector, "Director is required");
    });

    it("try to save movie with too long director results in error", async () => {
        const directorName = "Too Long John".repeat(20);
        await addMovieAndExpectError({ ...mockMovie, director: directorName }, "Director length must be less than or equal to 255 characters long");
    });

    // - actors (optional, string)

    it("Save movie without actors and expects to save it", async () => {
        const movieWithoutActors = Object.assign({}, mockMovie) as any;
        delete movieWithoutActors["actors"];
        await addMovieAndDontExpectError(movieWithoutActors);
    });

    // - plot (optional, string)

    it("Save movie without plot and expects to save it", async () => {
        const movieWithoutPlot = Object.assign({}, mockMovie) as any;
        delete movieWithoutPlot["plot"];
        await addMovieAndDontExpectError(movieWithoutPlot);
    });

    // - posterUrl (optional, string)

    it("Save movie without posterUrl and expects to save it", async () => {
        const movieWithoutPosterUrl = Object.assign({}, mockMovie) as any;
        delete movieWithoutPosterUrl["posterUrl"];
        await addMovieAndDontExpectError(movieWithoutPosterUrl);
    });

});