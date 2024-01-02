import { Knex } from 'knex';

import { IErrorDatabase, KnexDatabase } from '@/Infrastructure/Database/KnexDatabase';
import { ErrorDatabase, ErrorDatabaseKey } from '@/Common/Error';

export abstract class AbstractModel<T> {
    protected readonly _tableName: string;
    protected readonly _knex: Knex;

    protected constructor(tableName: string) {
        this._tableName = tableName;
        this._knex = KnexDatabase.getInstance().database as Knex;
    }

    protected transformColumnsToArray<K extends string>(columns: Partial<Record<K, string | boolean>>): string[] {
        const columnsArray: string[] = [];
        for (const column in columns)
            if (typeof columns[column] === 'boolean' && columns[column])
                columnsArray.push(column);
            else if (typeof columns[column] === 'string' && (columns[column] as string).length > 0)
                columnsArray.push(columns[column] as string);
        if (columnsArray.length === 0)
            columnsArray.push('*');
        return columnsArray;
    }

    private forwardException(err: unknown): void {
        if (err instanceof ErrorDatabase)
            throw err;
        switch ((err as IErrorDatabase)['code']) { // https://docs.postgresql.fr/9.6/errcodes-appendix.html
        case '23505':
            throw new ErrorDatabase({
                key: ErrorDatabaseKey.MODEL_UNIQUE_CONSTRAINT_ERROR,
                detail: err,
            });
        default:
            throw new ErrorDatabase({
                key: ErrorDatabaseKey.OTHER_DATABASE_ERROR,
                detail: err
            });
        }
    }

    public async create(entity: Partial<T>[]): Promise<void> {
        try {
            const number = await this._knex
                .insert(entity)
                .into(this._tableName);
            if (number.length === 0)
                throw new ErrorDatabase({
                    key: ErrorDatabaseKey.MODEL_NOT_CREATED,
                });
        } catch (err) {
            this.forwardException(err);
        }
    }

    public async update(entity: Partial<T>, entityToUpdate: Partial<T>): Promise<void> {
        try {
            const result: number = await this._knex
                .update(entity)
                .where(entityToUpdate)
                .from(this._tableName);
            if (result === 0)
                throw new ErrorDatabase({
                    key: ErrorDatabaseKey.MODEL_NOT_UPDATED,
                });
        } catch (err) {
            this.forwardException(err);
        }
    }


    public async delete(entityToDelete: Partial<T>): Promise<void> {
        try {
            const result: number = await this._knex
                .delete()
                .where(entityToDelete)
                .from(this._tableName);
            if (result === 0)
                throw new ErrorDatabase({
                    key: ErrorDatabaseKey.MODEL_NOT_DELETED,
                });
        } catch (err) {
            this.forwardException(err);
        }
    }


    public async get(entitiesToSearch: Partial<T>[], columnToSelect: Partial<Record<keyof T, boolean | string>>): Promise<T[] | undefined> {
        try {
            let query = this._knex
                .select(this.transformColumnsToArray(columnToSelect))
                .from(this._tableName);

            entitiesToSearch.forEach((entity: Partial<T>, index: number): void => {
                if (index === 0)
                    query = query.where(entity);
                else
                    query = query.orWhere(entity);
            });
            const result = await query;
            if (result.length === 0)
                throw new ErrorDatabase({
                    key: ErrorDatabaseKey.MODEL_NOT_FOUND,
                });
            return result;
        } catch (err) {
            this.forwardException(err);
        }
    }

    public async getAll(columnToSelect: Partial<Record<keyof T, boolean | string>>): Promise<T[] | undefined> {
        try {
            const result = await this._knex
                .select(this.transformColumnsToArray(columnToSelect))
                .from(this._tableName);
            if (result.length === 0)
                throw new ErrorDatabase({
                    key: ErrorDatabaseKey.MODEL_NOT_FOUND,
                });

            return result;
        } catch (err) {
            this.forwardException(err);
        }
    }

    public async count( entityToSearch: Partial<T>) {
        try {
            return await this._knex
                .count<Record<string, number>>({ count: '*' })
                .from(this._tableName)
                .where(entityToSearch);
        } catch (err) {
            this.forwardException(err);
        }
    }
}
