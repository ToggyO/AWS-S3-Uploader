import { config } from 'config';

import { S3Uploader } from './S3Uploader';

const {
    AWS_REGION,
    AWS_S3_ENDPOINT,
    AWS_S3_BUCKET_NAME,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
} = config;

const s3Uploader = new S3Uploader({
    region: AWS_REGION,
    endpoint: AWS_S3_ENDPOINT,
    bucketName: AWS_S3_BUCKET_NAME,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
}).build();

export { s3Uploader };
