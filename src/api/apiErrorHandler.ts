import { asFunction, AwilixContainer } from "awilix";
import { ErrorRequestHandler } from "express";
import { Logger } from "log4js";
import ErrorResponse from "../model/ErrorResponse";

const createErrorHandler = (logger: Logger): ErrorRequestHandler => {
    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        logger.warn("Error: " + err.message);
        const errorResponse: ErrorResponse = { error: err.message };
        res.status(400).json(errorResponse);
    };
    return errorHandler;
};

export const registerErrorHandler = (container: AwilixContainer): void => {
    container.register({
        errorHandler: asFunction(createErrorHandler).singleton()
    });
};