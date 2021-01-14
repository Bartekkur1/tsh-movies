import { createContainer } from "./container";
import { Logger } from "log4js";
import config from "../config.json";
import { AppConfig } from "./config";

(async () => {
    const container = await createContainer(config as AppConfig);

    const logger = container.resolve<Logger>("logger");
    logger.info("It works!");
})();