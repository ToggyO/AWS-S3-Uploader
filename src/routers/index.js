import { fileHandler } from 'utils/fileHandler';
import { imageProcessor } from 'utils/imageProcessor';
import { s3Uploader } from 'utils/s3-uploader';

import { UploadRouter, UploadController, UploadService } from './upload';

const routersCollection = [
    new UploadRouter(
        new UploadController(
            new UploadService(imageProcessor, s3Uploader),
        ),
        fileHandler,
    ),
];

export { routersCollection };
