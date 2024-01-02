import { Knex, knex } from 'knex';
import Transaction = Knex.Transaction;

import { ErrorDatabase, ErrorDatabaseKey } from '@/Common/Error';
import { MigrationSource } from '@/Infrastructure/Database/Migration';

export type { Transaction };

export interface IErrorDatabase {
    length: number;
    name: string;
    severity: string;
    code: string;
    detail: string;
    hint: string;
    position: string;
    internalPosition: string;
    internalQuery: string;
    where: string;
    schema: string;
    table: string;
    column: string;
    dataType: string;
    constraint: string;
    file: string;
    line: string;
    routine: string;
    stack: string;
    message: string;
}

export class KnexDatabase {
    private static _instance: KnexDatabase;
    private readonly _config: Knex.Config;
    private _database: Knex | undefined;

    constructor(config: Knex.Config) {
        this._config = config;
    }

    public connect(): void {
        try {
            this._database = knex(this._config);
        } catch (error) {
            throw new ErrorDatabase({
                key: ErrorDatabaseKey.DB_CONNECTION_ERROR,
                detail: error
            });
        }
    }

    public disconnect(): void {
        try {
            this._database?.destroy();
        } catch (error) {
            throw new ErrorDatabase({
                key: ErrorDatabaseKey.DB_DISCONNECT_ERROR,
                detail: error
            });
        }
    }

    public runMigrations(): Promise<void> {
        if (!this._database)
            return Promise.reject(new ErrorDatabase({
                key: ErrorDatabaseKey.DB_NOT_CONNECTED
            }));
        return this._database.migrate.latest({
            migrationSource: new MigrationSource()
        });
    }

    public rollbackAllMigration(): Promise<void> {
        if (!this._database)
            return Promise.reject(new ErrorDatabase({
                key: ErrorDatabaseKey.DB_NOT_CONNECTED
            }));
        return this._database.migrate.rollback({
            migrationSource: new MigrationSource(),
        }, true);
    }


    public static getInstance(config?: Knex.Config): KnexDatabase {
        if (this._instance && !this._instance._config && !config)
            throw new ErrorDatabase({
                key: ErrorDatabaseKey.DB_NOT_CONNECTED
            });
        if (!KnexDatabase._instance && config)
            KnexDatabase._instance = new KnexDatabase(config);
        return KnexDatabase._instance;
    }

    get database(): Knex | undefined {
        return this._database;
    }
}
