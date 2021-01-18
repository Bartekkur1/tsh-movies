import { asClass, asValue, AwilixContainer } from "awilix";
import { Logger } from "log4js";
import low from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";
import { LowdbConfig } from "../config";
import { DbSchema, databaseDefaults } from "../model/dbSchema";
import { CollectionChain } from "lodash";

export class LowdbClient {
    private adapter: low.AdapterAsync<DbSchema>;
    private db?: low.LowdbAsync<DbSchema>;
    private logger: Logger;

    public async init(): Promise<void> {
        if (this.db === undefined) {
            this.db = await low(this.adapter);
            this.checkDatabaseCohesion();
        }
    }

    constructor(lowdbConfig: LowdbConfig, logger: Logger) {
        this.adapter = new FileAsync(lowdbConfig.path);
        this.logger = logger;
    }

    public getAdapter(): low.LowdbAsync<DbSchema> {
        if (this.db === undefined) throw new Error("Database not initialized!");
        return this.db;
    }

    public async clearDatabase(): Promise<void> {
        return this.getAdapter()
            .set("genres", databaseDefaults().genres)
            .set("movies", [])
            .write();
    }

    private async checkDatabaseCohesion(): Promise<void> {
        if (this.databaseIsEmpty()) {
            this.logger.info("Database is empty! initialization started...");
            await this.getAdapter().defaults(databaseDefaults()).write();
        } else if (this.validGenresCollection(this.getAdapter().get("genres"))) {
            this.logger.info("Fixing genres collection...");
            await this.fillGenres();
        }
        return Promise.resolve();
    }

    private fillGenres(): Promise<void> {
        return this.getAdapter().set("genres", databaseDefaults().genres).write();
    }

    private validGenresCollection(genresCollection: CollectionChain<string>): boolean {
        return this.genresIsEmpty(genresCollection) || this.genresInvalidSize(genresCollection);
    }

    private genresIsEmpty(genresCollection: CollectionChain<string>): boolean {
        const isEmpty = genresCollection === undefined || Object.keys(genresCollection).length === 0;
        if (isEmpty) this.logger.info("Genres collection is empty or undefined!");
        return isEmpty;
    }

    private genresInvalidSize(genresCollection: CollectionChain<string>): boolean {
        const isInvalid = genresCollection.value().length !== databaseDefaults().genres.length;
        if (isInvalid) this.logger.info("Genres collection invalid size!");
        return isInvalid;
    }

    private databaseIsEmpty() {
        return Object.keys(this.getAdapter().value()).length === 0;
    }
}

export const registerLowdb = async (container: AwilixContainer): Promise<void> => {
    container.register({
        lowdb: asClass(LowdbClient).singleton()
    });
    await container.resolve<LowdbClient>("lowdb").init();
};

export const registerCollections = (container: AwilixContainer): void => {
    const lowdbClient = container.resolve<LowdbClient>("lowdb");
    container.register({
        moviesCollection: asValue(lowdbClient.getAdapter().get("movies")),
        genresCollection: asValue(lowdbClient.getAdapter().get("genres"))
    });
};