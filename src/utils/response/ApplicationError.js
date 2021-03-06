import { ERROR_CODES } from 'constants';

class ApplicationError extends Error {
    errorMessage;
    errorCode;
    errors;
    statusCode;
    name = 'ApplicationError';

    constructor({
        errorMessage = 'Unknown error',
        errorCode = ERROR_CODES.internal_server_error,
        errors = [],
        statusCode = ERROR_CODES.internal_server_error,
    }) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this);
        } else {
            this.stack = new Error().stack;
        }

        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.errors = errors;
        this.statusCode = statusCode;
        this.name = 'ApplicationError';
    }
}

export { ApplicationError };
