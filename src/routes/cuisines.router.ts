import { CuisineController } from 'controllers/cuisine';
import { createCuisineValidationSchema } from 'controllers/cuisine/validation';
import { Router } from 'express';
import multer from 'multer';
import { validate } from 'utils/library/validate';
import os from 'os';
import { BaseRoute } from 'utils/library/utils';

const router = Router();
const cuisineController = new CuisineController();

const upload = multer({ dest: os.tmpdir() });
const bRoute = new BaseRoute('cuisines');
const create = bRoute.getRoute('/create');
const bulCreate = bRoute.getRoute('/bulkCreate');
const getAll = bRoute.getRoute('/');
const deleteSingle = bRoute.getRoute('/delete');

console.log('bRoute ----> \n\n\n', { bRoute });

// CREATE CUSTOMER
router.post(
    create,
    createCuisineValidationSchema,
    validate,
    cuisineController.createCuisine
);

router.post(
    bulCreate,
    upload.single('csvFile'),
    cuisineController.cuisinesBulCreate
);

// GET ALL CUISINES
router.get(getAll, cuisineController.getAllCuisines);

// SOFT DELETE CUISINE
router.post(deleteSingle, cuisineController.deleteCuisine);
export { router as cuisinesRoutes };
