import { AwilixContainer } from "awilix";
import { createContainer } from "../src/container";

export const mockContainer = async (): Promise<AwilixContainer> => {
    return createContainer({
        express: {
            address: "localhost",
            port: "8080"
        },
        lowdb: {
            path: "./tests/db.test.json"
        }
    });
}