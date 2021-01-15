import * as awilix from "awilix";
import { AppConfig, registerAppConfig } from "./config";
import { registerLogger } from "./container/logger";
import { registerCollections, registerLowdb } from "./container/lowdbClient";
import { registerLowdbMovieRepository } from "./repository/lowdbMovieRepository";
import { registerMovieService } from "./service/basicMovieService";

export const createContainer = async (appConfig: AppConfig): Promise<awilix.AwilixContainer> => {

    const container = awilix.createContainer({ injectionMode: "CLASSIC" });

    registerAppConfig(appConfig, container);
    registerLogger(container);
    await registerLowdb(container);
    registerCollections(container);

    registerLowdbMovieRepository(container);
    registerMovieService(container);

    return container;
};