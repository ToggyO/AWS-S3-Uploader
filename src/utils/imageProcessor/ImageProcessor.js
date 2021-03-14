import Jimp from 'jimp';

import { ERROR_CODES } from 'constants';
import { ApplicationError } from 'utils/response';

export class ImageProcessor {
    async processSingle(file) {
        if (!file) {
            return null;
        }
        if (!file.mimetype.startsWith('image')) {
            return file;
        }
        return this._processImage(file);
    }

    async processMany(filesArray) {
        if (!filesArray || !Array.isArray(filesArray)) {
            return null;
        }
        const promiseArray = filesArray.map(async (f) => {
            if (!f.mimetype.startsWith('image')) {
                return f;
            }
            return this.#processImage(f);
        });
        const files = await Promise.all(promiseArray);
        return files.flat();
    }

    async #processImage(file) {
        try {
            // FIXME: delete
            // let image = await Jimp.read(Buffer.from(file.buffer));
            // if (width || height) {
            //     const resizeWidth = width || Jimp.AUTO;
            //     const resizeHeight = height || Jimp.AUTO;
            //     image = await image.resize(resizeWidth, resizeHeight).getBufferAsync(Jimp.AUTO);
            // }
            // return {
            //     fileName: `${file.name}-${width}x${height}`,
            //     buffer: image,
            // };
            const image = await Jimp.read(Buffer.from(file.buffer));
            const large = await image.resize(1024, 1024).getBufferAsync(Jimp.AUTO);
            const medium = await image.resize(512, 512).getBufferAsync(Jimp.AUTO);
            const thumb = await image.resize(200, 200).getBufferAsync(Jimp.AUTO);
            return [
                {
                    originalname: `1024x1024_${file.originalname}`,
                    mimetype: file.mimetype,
                    buffer: large,
                },
                {
                    originalname: `512x512_${file.originalname}`,
                    mimetype: file.mimetype,
                    buffer: medium,
                },
                {
                    originalname: `200x200_${file.originalname}`,
                    mimetype: file.mimetype,
                    buffer: thumb,
                },
            ];
            // FIXME: delete
            // return { large, medium, thumb };
        } catch (error) {
            throw new ApplicationError({
                statusCode: 409,
                errorCode: ERROR_CODES.conflict,
                errorMessage: 'Error is occurred during image processing',
            });
        }
    }
}


// var express = require('express');
// var router = express.Router();
// var multer  = require('multer');
// var AWS = require('aws-sdk');
// var storage = multer.memoryStorage({
//     destination: function(req, file, callback) {
//         callback(null, '');
//     }
// });
// var multipleUpload = multer({ storage: storage }).array('file');
// var upload = multer({ storage: storage }).single('file');
// const BUCKET_NAME = 'BUCKET_NAME';
// const IAM_USER_KEY = 'USER_KEY';
// const IAM_USER_SECRET = 'USER_SECRET_KEY';
// router.post('/upload',multipleUpload, function (req, res) {
//     const file = req.files;
//     let s3bucket = new AWS.S3({
//         accessKeyId: IAM_USER_KEY,
//         secretAccessKey: IAM_USER_SECRET,
//         Bucket: 'BUCKET_NAME'
//     });
//     s3bucket.createBucket(function () {
//         let Bucket_Path = 'BUCKET_PATH';
//         //Where you want to store your file
//         var ResponseData = [];
//
//         file.map((item) => {
//             var params = {
//                 Bucket: BucketPath,
//                 Key: item.originalname,
//                 Body: item.buffer,
//                 ACL: 'public-read'
//             };
//             s3bucket.upload(params, function (err, data) {
//                 if (err) {
//                     res.json({ "error": true, "Message": err});
//                 }else{
//                     ResponseData.push(data);
//                     if(ResponseData.length == file.length){
//                         res.json({ "error": false, "Message": "File Uploaded    SuceesFully", Data: ResponseData});
//                     }
//                 }
//             });
//         });
//     });
// });
// module.exports = router;