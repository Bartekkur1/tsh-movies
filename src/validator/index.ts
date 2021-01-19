import { asFunction, AwilixContainer } from "awilix";
import { createMovieSoValidator } from "./movieSoValidator";
import { createMovieValidator } from "./movieValidator";

export const registerModelValidators = (container: AwilixContainer): void => {
    container.register({
        movieValidator: asFunction(createMovieValidator).singleton(),
        movieSoValidator: asFunction(createMovieSoValidator).singleton()
    });
};