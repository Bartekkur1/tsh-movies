import { asFunction, AwilixContainer } from "awilix";
import { Router } from "express";

export const createRouter = (movieApi: Router): Router => Router().use("/movie", movieApi);

export const registerRouter = (container: AwilixContainer): void => {
    container.register({
        router: asFunction(createRouter).singleton()
    });
};