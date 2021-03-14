import { ERROR_CODES } from 'constants';
import { ApplicationError } from 'utils/response';

export class UploadService {
    #imageProcessor
    #s3Uploader;

    constructor(imageProcessor, s3Uploader) {
        this.#imageProcessor = imageProcessor;
        this.#s3Uploader = s3Uploader;
    }

    async handleFiles(files) {
        if (!files || !Array.isArray(files)) {
            this.#throwError();
        }
        return this.#imageProcessor.processMany(files);
    }

    async handleUpload(filesArrayDto) {
        if (!filesArrayDto || !Array.isArray(filesArrayDto)) {
            this.#throwError();
        }
        const promiseArray = filesArrayDto.map(async (f) => this.#s3Uploader.upload(f));
        return Promise.all(promiseArray);
    }

    #throwError() {
        throw new ApplicationError({
            statusCode: 400,
            errorCode: ERROR_CODES.validation,
            errorMessage: 'Files is required',
            errors: [],
        });
    }
}
