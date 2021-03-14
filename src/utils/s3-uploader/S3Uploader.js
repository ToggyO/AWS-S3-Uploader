import AWS from 'aws-sdk';

export class S3Uploader {
    #s3Bucket;
    #options = {};

    constructor(options) {
        this.#options = options;
    }

    build() {
        this.#s3Bucket = new AWS.S3({
            accessKeyId: this.#options.accessKeyId,
            secretAccessKey: this.#options.secretAccessKey,
            endpoint: this.#options.endpoint,
            region: this.#options.region,
        });
        return this;
    }

    async createBucket() {
        return this.#s3Bucket.createBucket({
            Bucket: this.#options.bucketName,
        }).promise();
    }

    async upload(file) {
        const params = {
            Bucket: this.#options.bucketName,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };
        return this.#s3Bucket.upload(params).promise();
    }
}
