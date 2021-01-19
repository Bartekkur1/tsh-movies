import * as awilix from "awilix";
import { Logger } from "log4js";
import { registerErrorHandler } from "./api/apiErrorHandler";
import { registerMovieApi } from "./api/movieApi";
import { registerRouter } from "./api/router";
import { AppConfig, registerAppConfig } from "./config";
import { registerExpressServer } from "./container/expressServer";
import { registerLogger } from "./container/logger";
import { registerCollections, registerLowdb } from "./container/lowdbClient";
import { registerLowdbMovieRepository } from "./repository/lowdbMovieRepository";
import { registerMovieService } from "./service/basicMovieService";
import { registerModelValidators } from "./validator";

export const createContainer = async (appConfig: AppConfig, logger: Logger): Promise<awilix.AwilixContainer> => {

    const container = awilix.createContainer({ injectionMode: "CLASSIC" });

    registerAppConfig(appConfig, container);
    registerLogger(container, logger);
    await registerLowdb(container);
    registerCollections(container);

    registerLowdbMovieRepository(container);
    registerMovieService(container);
    registerModelValidators(container);

    registerErrorHandler(container);
    registerMovieApi(container);
    registerRouter(container);
    registerExpressServer(container);

    return container;
};