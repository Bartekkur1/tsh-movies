import { asValue, AwilixContainer } from "awilix";

export interface LowdbConfig {
    path: string;
}

export interface ExpressConfig {
    port: number;
    address: string;
}

export interface AppConfig {
    express: ExpressConfig;
    lowdb: LowdbConfig;
}

export const validateConfig = (config: AppConfig): AppConfig => {
    // TODO: Add Joi
    return config;
};

export const registerAppConfig = (config: AppConfig, container: AwilixContainer): void => {
    container.register({
        appConfig: asValue(validateConfig(config)),
        expressConfig: asValue(config.express),
        lowdbConfig: asValue(config.lowdb)
    });
};