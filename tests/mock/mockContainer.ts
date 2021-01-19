import { AwilixContainer } from "awilix";
import { Logger } from "log4js";
import { createContainer } from "../../src/container";

export const mockContainer = async (logger: Logger): Promise<AwilixContainer> => {
    return createContainer({
        express: {
            address: "localhost",
            port: 8080
        },
        lowdb: {
            path: "./tests/db.test.json"
        }
    }, logger);
};