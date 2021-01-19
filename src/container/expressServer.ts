import { asFunction, AwilixContainer } from "awilix";
import express, { Application, ErrorRequestHandler, Router } from "express";
import bodyParser from "body-parser";

export const createServer = (router: Router, errorHandler: ErrorRequestHandler): Application => {
    const app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

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