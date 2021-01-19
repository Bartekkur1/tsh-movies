import { asFunction, AwilixContainer } from "awilix";
import { Request, RequestHandler, Response, Router } from "express";
import Movie from "../model/entity/movie";
import MovieSO from "../model/so/movieSO";
import MovieService from "../service/types";
import { genresStringToArray } from "../util/movieUtil";

export const createMovieApi = (
    movieService: MovieService,
    movieValidator: RequestHandler,
    movieSoValidator: RequestHandler
): Router => {
    const router = Router();

    router.get("/", movieSoValidator, (req: Request, res: Response) => {
        const duration = Number(req.query.duration);
        const genres = genresStringToArray(req.query.genres as string);
        const movieSo: MovieSO = { duration, genres };

        if (Number.isNaN(movieSo.duration) && movieSo.genres?.length === 0) {
            return res.status(200).json(movieService.findRandomMovie());
        } else {
            return res.status(200).json(movieService.findMovies(movieSo));
        }
    });

    router.put("/", movieValidator, (req: Request, res: Response) => {
        const movie = req.body as Movie;
        movieService.saveMovie(movie);
        res.sendStatus(201);
    });

    return router;
};

export const registerMovieApi = (container: AwilixContainer): void => {
    container.register({
        movieApi: asFunction(createMovieApi).singleton()
    });
};