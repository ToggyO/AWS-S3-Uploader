import { getSuccessRes } from 'utils/response';
import { getProp } from 'utils/helpers';

export class UploadController {
    #service;

    constructor(service) {
        this.#service = service;
        this.upload = this.upload.bind(this);
    }

    async upload(req, res, next) {
        try {
            const files = getProp(req, 'files', {});
            const processedFilesDto = await this.#service.handleFiles(files);
            const resultData = await this.#service.handleUpload(processedFilesDto);
            res.status(200).send(getSuccessRes({ resultData }));
        } catch (error) {
            next(error);
        }
    }
}
