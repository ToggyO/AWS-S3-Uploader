import multer from 'multer';

import { ERROR_CODES } from 'constants';
import { ApplicationError } from 'utils/response';

export class MulterFileHandler {
    #multer;
    #options;

    constructor(options) {
        this.#options = options;
    }

    build() {
        const { maxFileSizeMb = 5, supportedMimeTypes = [] } = this.#options;
        const multerOptions = {
            storage: multer.memoryStorage(),
            fileFilter: (req, file, cb) => {
                if (!supportedMimeTypes || !Array.isArray(supportedMimeTypes)) {
                    return cb(null, true);
                }
                const isAllowedFileType = supportedMimeTypes.includes(file.mimetype);
                if (!isAllowedFileType) {
                    return cb(
                        new ApplicationError({
                            statusCode: 400,
                            errorCode: ERROR_CODES.validation,
                            errorMessage: `Unsupported file type '${file.mimetype}'`,
                            errors: [],
                        }),
                    );
                }
                return cb(null, true);
            },
            limits: { fileSize: Number(maxFileSizeMb) * 1024 * 1024 },
        };
        this.#multer = multer(multerOptions);
        return this;
    }

    get uploader() {
        return this.#multer;
    }

    uploadSingle(fieldName) {
        return this.#multer.single(fieldName);
    }

    uploadMany(fieldName, maxCount) {
        return this.#multer.array(fieldName, maxCount);
    }
}
