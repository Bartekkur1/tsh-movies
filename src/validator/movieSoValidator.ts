import { RequestHandler } from "express";
import Joi from "joi";
import MovieService from "../service/types";
import { genresStringToArray } from "../util/movieUtil";
import ValidationError from "./validationError";

const createMovieSoValidationSchema = () =>
    Joi.object({
        duration: Joi.number()
            .optional()
            .label("Runtime"),
        genres: Joi.optional()
    });

export const createMovieSoValidator = (movieService: MovieService): RequestHandler => {
    const movieValidator: RequestHandler = (req, res, next) => {
        const query = req.query;
        const constrains = createMovieSoValidationSchema().validate(query);
        if (constrains.error)
            throw new ValidationError(constrains);

        if (query.genres) {
            const genres = genresStringToArray(query.genres as string);
            if (!genres.length)
                throw new ValidationError("Genres must contain at least 1 items");
            if (!movieService.genresExists(genres))
                throw new ValidationError("Movie contains unknown genres");
        }

        next();
    };

    return movieValidator;
};