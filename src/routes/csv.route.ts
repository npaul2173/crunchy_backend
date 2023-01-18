import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import fs from 'fs';
import os from 'os';
import { parse } from 'csv-parse';
import Logging from 'utils/library/logging';

const router = Router();
const getRoute = (uri?: string) => `/sample${uri}`;

const upload = multer({ dest: os.tmpdir() });

router.post('/stats', upload.single('uploaded_file'), function (req, res) {
    const readableStream = fs.createReadStream(req.file?.path!);
    readableStream
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', function (row) {
            Logging.info(row);
        })
        .on('end', function () {
            Logging.info('finished');
        })
        .on('error', function (error) {
            Logging.info(error.message);
        });

    // .pipe(parse({ delimiter: ",", from_line: 2 }))
    res.status(StatusCodes.OK).send({ message: 'Received' });
});

export { router as sampleRouter };
