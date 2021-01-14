import * as awilix from "awilix";
import { AppConfig, registerAppConfig } from "./config";
import { registerLogger } from "./container/logger";

export const createContainer = async (appConfig: AppConfig): Promise<awilix.AwilixContainer> => {

    const container = awilix.createContainer();
    registerAppConfig(appConfig, container);
    registerLogger(container);

    return container;
};