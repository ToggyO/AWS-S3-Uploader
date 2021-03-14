import { config } from 'config';

import { MulterFileHandler } from './MulterFileHandler';

const fileHandler = new MulterFileHandler({
    maxFileSizeMb: config.MAX_FILE_SIZE_MB,
    supportedMimeTypes: config.SUPPORTED_FILE_TYPES,
}).build();

export { fileHandler };
