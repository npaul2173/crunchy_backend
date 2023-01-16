import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import AWS, { S3 } from 'aws-sdk';
import fs from 'fs';

class UploadController {
    public async Upload(req: Request, res: Response, next: NextFunction) {
        try {
            if (
                req.file?.mimetype === 'image/jpeg' ||
                req.file?.mimetype === 'image/png'
            ) {
                const timestamp = new Date().getTime();
                const fileContent = fs.readFileSync(req.file.path);
                const folderPath = 'crunchy/restaurant/';
                const s3 = new AWS.S3({
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                });
                const params: S3.Types.PutObjectRequest = {
                    Bucket: process.env.AWS_BUCKET_NAME!,
                    Key: `${folderPath}Restaurants_${timestamp}.jpg`,
                    Body: fileContent,
                };
                s3.upload(params, (err, data) => {
                    if (err) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                            status: true,
                            message: 'Error while uploading file',
                        });
                    }
                    res.status(StatusCodes.OK).send({
                        status: true,
                        message: 'File uploaded successfully',
                        data,
                    });
                });
            } else {
                res.status(StatusCodes.BAD_REQUEST).send({
                    status: false,
                    message: 'Only JPEG and PNG accepted',
                });
            }
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Cannot Create Cuisine'
                )
            );
        }
    }
}

export { UploadController };
