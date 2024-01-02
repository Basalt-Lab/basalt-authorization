import { ErrorEntity } from '@/Common/Error/ErrorEntity';

export enum ErrorDatabaseKey {
    DB_CONNECTION_ERROR = 'DB_CONNECTION_ERROR',
    DB_DISCONNECT_ERROR = 'DB_DISCONNECT_ERROR',
    DB_NOT_CONNECTED = 'DB_NOT_CONNECTED',
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
