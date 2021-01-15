import { asClass, AwilixContainer } from "awilix";
import { Logger } from "log4js";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { AppConfig } from "../config";
import { DbSchema, databaseDefaults } from "../model/dbSchema";
import { Genre } from "../model/entity/genres";
import { CollectionChain } from "lodash";

export class LowdbClient {
    private adapter: low.AdapterSync<DbSchema>;
    private db: low.LowdbSync<DbSchema>;
    private logger: Logger;

    constructor(appConfig: AppConfig, logger: Logger) {
        this.adapter = new FileSync(appConfig.lowdb.path);
        this.logger = logger;
        this.db = low(this.adapter);
        this.checkDatabaseValidity();
    }

    public getAdapter(): low.LowdbSync<DbSchema> {
        return this.db;
    }

    private checkDatabaseValidity(): void {
        if (this.databaseIsEmpty()) {
            this.logger.info("Database is empty! initialization started...");
            this.getAdapter().defaults(databaseDefaults()).write();
        } else if (this.validGenresCollection(this.getAdapter().get("genres"))) {
            this.logger.info("Genres collection is invalid! fixing...");
            this.fillGenres(this.getAdapter().get("genres"));
        }
    }

    private fillGenres(genresCollection: CollectionChain<Genre>): void {
        const missingGenres = databaseDefaults().genres.filter(g => !genresCollection.includes(g));
        this.getAdapter().get("genres").push(...missingGenres).write();
    }

    private validGenresCollection(genresCollection: CollectionChain<Genre>): boolean {
        return this.genresIsEmpty(genresCollection) || this.genresInvalidSize(genresCollection);
    }

    private genresIsEmpty(genresCollection: CollectionChain<Genre>): boolean {
        return genresCollection === undefined || Object.keys(genresCollection).length === 0;
    }

    private genresInvalidSize(genresCollection: CollectionChain<Genre>): boolean {
        return genresCollection.value().length !== databaseDefaults().genres.length;
    }

    private databaseIsEmpty() {
        return Object.keys(this.getAdapter().value()).length === 0;
    }
}

export const registerLowdb = (container: AwilixContainer): void => {
    container.register({
        lowdb: asClass(LowdbClient).singleton()
    });
};