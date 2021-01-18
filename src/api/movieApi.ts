import { asFunction, AwilixContainer } from "awilix";
import { Router } from "express";

export const createMovieApi = (): Router => {
    const router = Router();

    router.get("/", (req, res) => {
        res.sendStatus(200);
    });

    router.put("/", (req, res) => {
        res.sendStatus(201);
    });

    return router;
};

export const registerMovieApi = (container: AwilixContainer): void => {
    container.register({
        movieApi: asFunction(createMovieApi).singleton()
    });
};