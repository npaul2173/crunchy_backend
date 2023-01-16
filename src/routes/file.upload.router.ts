import { Router } from 'express';
import multer from 'multer';
import { validate } from 'utils/library/validate';
import os from 'os';
import { UploadController } from 'controllers/upload';

const router = Router();
const uploadController = new UploadController();
const getRoute = (uri?: string) => `/upload${uri}`;
const upload = multer({ dest: os.tmpdir() });

router.post(
    getRoute('/'),
    upload.single('uploadFile'),
    uploadController.Upload
);

export { router as uploadRoutes };
