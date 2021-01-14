import { asClass, AwilixContainer } from "awilix";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { AppConfig } from "../config";
import DbSchema from "../model/dbSchema";

export class LowdbClient {
    private adapter: low.AdapterSync<DbSchema>;
    private db: low.LowdbSync<DbSchema>;

    constructor(appConfig: AppConfig) {
        this.adapter = new FileSync(appConfig.lowdb.path);
        this.db = low(this.adapter);
    }

    getAdapter = (): low.LowdbSync<DbSchema> => this.db;
}

export const registerLowdb = (container: AwilixContainer): void => {
    container.register({
        lowdb: asClass(LowdbClient).singleton()
    });
};