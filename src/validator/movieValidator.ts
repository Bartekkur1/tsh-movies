import { RequestHandler } from "express";
import Joi from "joi";
import MovieService from "../service/types";
import ValidationError from "./validationError";

const createMovieValidationSchema = () =>
    Joi.object({
        title: Joi.string()
            .required()
            .max(255)
            .empty()
            .label("Title"),
        year: Joi.number()
            .required()
            .label("Year"),
        runtime: Joi.number()
            .required()
            .label("Runtime"),
        genres: Joi.array()
            .required()
            .min(1)
            .empty().label("Genres"),
        director: Joi.string()
            .required()
            .max(255)
            .label("Director"),
        actors: Joi.string().optional().label("Actors"),
        plot: Joi.string().optional().label("Plot"),
        posterUrl: Joi.string().optional().label("Poster url")
    });


export const createMovieValidator = (movieService: MovieService): RequestHandler => {
    const movieValidator: RequestHandler = (req, res, next) => {
        if (req.body === undefined)
            throw new ValidationError("Request body is empty");

        const constrains = createMovieValidationSchema().validate(req.body);
        if (constrains.error)
            throw new ValidationError(constrains);

        if (!movieService.genresExists(req.body.genres))
            throw new ValidationError("Movie contains unknown genres");

        next();
    };

    return movieValidator;
};