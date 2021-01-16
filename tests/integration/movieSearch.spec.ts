import { AwilixContainer } from "awilix";
import { mockContainer } from "../mock/mockContainer";
import request from "supertest";
import { LowdbClient } from "../../src/container/lowdbClient";
import { mockMovies } from "../mock/mockMovies";
import Movie from "../../src/model/entity/movie";

// In any of those cases we don't want to have duplicates.
describe("Movie search rest api", () => {

    let container: AwilixContainer;
    let lowdbClient: LowdbClient;
    let app: any;

    beforeAll(async () => {
        container = await mockContainer();
        lowdbClient = container.resolve<LowdbClient>("lowdb");
        await lowdbClient.getAdapter().set("movies", mockMovies).write();
        app = container.resolve("app");
    });

    // If we don't provide any parameter, then it should return a single random movie.

    it("get random movie without parameters", () => {
        request(app)
            .get("/api/movie")
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty("id");
                expect(res.body).toHaveProperty("title");
                expect(res.body).toHaveProperty("year");
                expect(res.body).toHaveProperty("runtime");
                expect(res.body).toHaveProperty("genres");
            });
    });

    // If we provide only duration parameter, then it should return a single random movie that has a runtime between <duration - 10> and <duration + 10>.

    it("get random movie without parameters", () => {
        const searchedRuntime = 60;
        const minRuntime = searchedRuntime - 10;
        const maxRuntime = searchedRuntime + 10;
        request(app)
            .get("/api/movie?runtime=" + searchedRuntime)
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty("runtime");
                expect(res.body.runtime).toBeLessThanOrEqual(maxRuntime);
                expect(res.body.runtime).toBeLessThanOrEqual(minRuntime);
            });
    });

    // If we provide only genres parameter, then it should return all movies that contain at least one of the specified genres. 
    // Also movies should be orderd by a number of genres that match. 
    // For example if we send a request with genres [Comedy, Fantasy, Crime] then the top hits should be movies that have all three of them
    // then there should be movies that have one of [Comedy, Fantasy], [comedy, crime], [Fantasy, Crime] and then those with Comedy only, Fantasy only and Crime only.

    it("get movies by given genres", () => {
        request(app)
            .get("/api/movie?genres=Comedy,Fantasy,Crime")
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect((res.body as Movie[]).length).toEqual(7);

                const firstMovie = res.body[0] as Movie;
                expect(firstMovie.genres.length).toEqual(3);
                expect(firstMovie.genres).toContain("Comedy");
                expect(firstMovie.genres).toContain("Fantasy");
                expect(firstMovie.genres).toContain("Crime");

                const secondMovie = res.body[1] as Movie;
                expect(secondMovie.genres.length).toEqual(2);
                expect(secondMovie.genres).toContain("Fantasy");
                expect(secondMovie.genres.includes("Comedy") || secondMovie.genres.includes("Crime")).toBeTruthy();

                expect(res.body[3].genres.length).toEqual(1);
                expect(res.body[4].genres.length).toEqual(1);
                expect(res.body[5].genres.length).toEqual(1);
            });
    });

    // And the last one. If we provide both duration and genres parameter
    // then we should get the same result as for genres parameter only but narrowed by a runtime. 
    // So we should return only those movies that contain at least one of the specified genres and have a runtime between <duration - 10> and <duration + 10>.

    it("get movies by given genres and runtime", () => {
        const searchedRuntime = 200;
        const minRuntime = searchedRuntime - 10;
        const maxRuntime = searchedRuntime + 10;
        request(app)
            .get("/api/movie?duration=200&genres=Comedy,Fantasy,Crime")
            .end((err, res) => {
                const movies = res.body as Movie[];
                expect(res.status).toBe(200);
                expect(movies.length).toEqual(3);
                
                expect(movies[0].genres).toEqual(3);
                expect(movies[0].runtime).toBeLessThanOrEqual(maxRuntime);
                expect(movies[0].runtime).toBeGreaterThanOrEqual(minRuntime);

                expect(movies[1].genres).toEqual(2);
                expect(movies[1].runtime).toBeLessThanOrEqual(maxRuntime);
                expect(movies[1].runtime).toBeGreaterThanOrEqual(minRuntime);

                expect(movies[2].genres).toEqual(1);
                expect(movies[2].runtime).toBeLessThanOrEqual(maxRuntime);
                expect(movies[2].runtime).toBeGreaterThanOrEqual(minRuntime);
            });
    });
});