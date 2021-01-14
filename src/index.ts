import { createContainer } from "./container";
import { Logger } from "log4js";

(async () => {
    const container = await createContainer();

    const logger = container.resolve<Logger>("logger");
    logger.info("It works!");
})();