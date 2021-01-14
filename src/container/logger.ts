import { asValue, AwilixContainer } from "awilix";
import { configure, getLogger } from "log4js";

configure({
    appenders: {
        "out": { type: "stdout" },
        "tsh-movies": { type: "file", filename: "./tsh-movies.log" }
    },
    categories: {
        default: { appenders: ["out", "tsh-movies"], level: "debug" }
    }
});

export const registerLogger = (container: AwilixContainer): void => {
    container.register({
        logger: asValue(getLogger("info"))
    });
};