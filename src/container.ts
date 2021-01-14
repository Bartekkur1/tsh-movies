import * as awilix from "awilix";
import { AppConfig, registerAppConfig } from "./config";
import { registerLogger } from "./container/logger";
import { registerLowdb } from "./container/lowdbClient";
import { registerLowdbMovieRepository } from "./repository/movieRepository";
import { registerMovieService } from "./service/movieService";

export const createContainer = async (appConfig: AppConfig): Promise<awilix.AwilixContainer> => {

    const container = awilix.createContainer({ injectionMode: "CLASSIC" });

    registerAppConfig(appConfig, container);
    registerLogger(container);
    registerLowdb(container);

    registerLowdbMovieRepository(container);
    registerMovieService(container);

    return container;
};