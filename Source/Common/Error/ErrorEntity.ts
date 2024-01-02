import { randomUUID } from 'crypto';

export class ErrorEntity extends Error {
    private readonly _uuidError: string = randomUUID();
    private readonly _name: string;
    private readonly _detail?: unknown;
    private readonly _stack: string | undefined;

    /**
     * constructor
     * @param error {messageKey: string, detail?: unknown}
     */
    constructor(error: {
        messageKey: string,
        detail?: unknown
    }) {
        super();
        this.message = error.messageKey;
        this._name = this.constructor.name;
        this._detail = error.detail;
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, this.constructor);
        this._stack = this.stack;
    }

    /**
     * getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     * getter detail
     * @return {unknown}
     */
    public get detail(): unknown {
        return this._detail;
    }

    /**
     * getter uuidError (unique id of error)
     * @return {string}
     */
    public get uuidError(): string {
        return this._uuidError;
    }

    /**
     * getter stack
     * @return {string | undefined}
     */
    public get stack(): string | undefined {
        return this._stack;
    }
}
