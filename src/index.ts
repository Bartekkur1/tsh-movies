import { createContainer } from "./container";
import config from "../config.json";
import { AppConfig, ExpressConfig } from "./config";
import { Application } from "express";
import { getLogger, Logger } from "log4js";

(async () => {
    const container = await createContainer(config as AppConfig, getLogger("info"));

    const expressApp = container.resolve<Application>("app");
    const logger = container.resolve<Logger>("logger");
    const expressConfig = container.resolve<ExpressConfig>("expressConfig");

    expressApp.listen(expressConfig.port, expressConfig.address, () => {
        logger.info("Server running on " + expressConfig.address + ":" + expressConfig.port);
    });

})();