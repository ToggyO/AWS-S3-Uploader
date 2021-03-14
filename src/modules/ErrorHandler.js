import { ERROR_CODES } from 'constants';

export class ErrorHandler {
    run(app) {
        app.use(
            (
                err,
                req,
                res,
                next,
            ) => {
                if (!err.errorCode) {
                    console.error(err);
                }

                if (err.statusCode && err.errorMessage) {
                    const {
                        statusCode, errorCode, errorMessage, errors = [],
                    } = err;
                    res.status(statusCode).send({
                        errorCode,
                        errorMessage,
                        errors,
                    });
                    return;
                }

                res.status(err.statusCode || ERROR_CODES.internal_server_error).send({
                    errorCode: err.errorCode || ERROR_CODES.internal_server_error,
                    errorMessage:
                    err.errorCode && err.errorCode !== ERROR_CODES.internal_server_error
                        ? err.errorMessage
                        : `Internal server error: ${err.errorMessage || err.message}`,
                    errors: err.errors || [],
                });
            },
        );
    }
}
