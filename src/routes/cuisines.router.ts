import { CuisineController } from 'controllers/cuisine';
import { createCuisineValidationSchema } from 'controllers/cuisine/validation';
import { Router } from 'express';
import { validate } from 'utils/library/validate';

const router = Router();
const cuisineController = new CuisineController();
const getRoute = (uri?: string) => `/cuisines${uri}`;

// CREATE CUSTOMER
router.post(
    getRoute('/create'),
    createCuisineValidationSchema,
    validate,
    cuisineController.createCuisine
);

// GET ALL CUISINES
router.get(getRoute('/'), cuisineController.getAllCuisines);

export { router as cuisinesRoutes };
