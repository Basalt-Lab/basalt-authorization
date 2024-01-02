import { ErrorEntity } from '@/Common/Error/ErrorEntity';

export enum ErrorDatabaseKey {
    DB_CONNECTION_ERROR = 'DB_CONNECTION_ERROR',
    DB_DISCONNECT_ERROR = 'DB_DISCONNECT_ERROR',
    DB_NOT_CONNECTED = 'DB_NOT_CONNECTED',
    MODEL_UNIQUE_CONSTRAINT_ERROR = 'MODEL_UNIQUE_CONSTRAINT_ERROR',
    OTHER_DATABASE_ERROR = 'OTHER_DATABASE_ERROR',
    MODEL_NOT_CREATED = 'MODEL_NOT_CREATED',
    MODEL_NOT_UPDATED = 'MODEL_NOT_UPDATED',
    MODEL_NOT_DELETED = 'MODEL_NOT_DELETED',
    MODEL_NOT_FOUND = 'MODEL_NOT_FOUND',
}

export class ErrorDatabase extends ErrorEntity {
    constructor(error: {
        key: string,
        detail?: unknown,
    }) {
        super({
            messageKey: error.key,
            detail: error.detail,
        });
    }
}
