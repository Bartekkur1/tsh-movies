import { asFunction, AwilixContainer } from "awilix";
import { Request, RequestHandler, Response, Router } from "express";
import Movie from "../model/entity/movie";
import MovieService from "../service/types";

export const createMovieApi = (movieService: MovieService, movieValidator: RequestHandler): Router => {
    const router = Router();

    router.get("/", (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    router.put("/", movieValidator, (req: Request, res: Response) => {
        const movie = req.body as Movie;
        res.sendStatus(201);
    });

    return router;
};

export const registerMovieApi = (container: AwilixContainer): void => {
    container.register({
        movieApi: asFunction(createMovieApi).singleton()
    });
};