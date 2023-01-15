import { CuisineController } from 'controllers/cuisine';
import { createCuisineValidationSchema } from 'controllers/cuisine/validation';
import { Router } from 'express';
import multer from 'multer';
import { validate } from 'utils/library/validate';
import os from 'os';

const router = Router();
const cuisineController = new CuisineController();
const getRoute = (uri?: string) => `/cuisines${uri}`;
const upload = multer({ dest: os.tmpdir() });

// CREATE CUSTOMER
router.post(
    getRoute('/create'),
    createCuisineValidationSchema,
    validate,
    cuisineController.createCuisine
);

router.post(
    getRoute('/bulkCreate'),
    upload.single('csvFile'),
    cuisineController.cuisinesBulCreate
);

// GET ALL CUISINES
router.get(getRoute('/'), cuisineController.getAllCuisines);

// SOFT DELETE CUISINE
router.post(getRoute('/delete'), cuisineController.deleteCuisine);
export { router as cuisinesRoutes };
