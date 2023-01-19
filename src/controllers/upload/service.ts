import { Multer } from 'multer';
import fs from 'fs';
import AWS, { S3 } from 'aws-sdk';
import { UploadPaths } from './enums';
import Logging from 'utils/library/logging';

class UploadService {
    public uploadImage(filePath: string, uploadPath: UploadPaths) {
        return new Promise(async function (resolve, reject) {
            const timestamp = new Date().getTime();
            const fileContent = fs.readFileSync(filePath);
            const s3 = new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            });
            const params: S3.Types.PutObjectRequest = {
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: `${uploadPath}Restaurants_${timestamp}.jpg`,
                Body: fileContent,
            };
            Logging.warning({ params });
            s3.upload(params, function (s3Err, data) {
                if (s3Err) {
                    reject(s3Err);
                }
                Logging.info(`File uploaded successfully at ${data.Location}`);
                resolve(data.Location);
            });
        });
    }
}

export default UploadService;
