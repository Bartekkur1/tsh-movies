import { asFunction, AwilixContainer } from "awilix";
import { createMovieValidator } from "./movieValidator";

export const registerModelValidators = (container: AwilixContainer) => {
    container.register({
        movieValidator: asFunction(createMovieValidator).singleton()
    });
};