import { asFunction, AwilixContainer } from "awilix";
import express, { Application, ErrorRequestHandler, Router } from "express";

export const createServer = (router: Router, errorHandler: ErrorRequestHandler): Application => {
    const app = express();

    app.use("/api", router);

    app.use(errorHandler);
    app.use(async (req, res) => {
        res.sendStatus(404);
    });

    return app;
};

export const registerExpressServer = (container: AwilixContainer): void => {
    container.register({
        app: asFunction(createServer).singleton()
    });
};