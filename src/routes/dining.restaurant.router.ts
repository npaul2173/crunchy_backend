import { Router } from 'express';
import multer from 'multer';
import { validate } from 'utils/library/validate';
import os from 'os';
import { BaseRoute } from 'utils/library/utils';
import DiningRestaurantController from 'controllers/Dining/Restaurants';
import {
    createDiningRestaurantValidationSchema,
    updatePopularDishesValidationSchema,
} from 'controllers/Dining/Restaurants/validation';
import { validateMultipleImage } from 'controllers/upload/validate';

const router = Router();
const controller = new DiningRestaurantController();

const upload = multer({ dest: os.tmpdir() });
const bRoute = new BaseRoute('diningRestaurant');

// CREATE CUSTOMER
router.post(
    bRoute.getRoute('/create'),
    upload.array('photos', 10),
    createDiningRestaurantValidationSchema,
    validate,
    validateMultipleImage,
    controller.createDiningRestaurant
);

// GET ALL CUISINES
router.post(bRoute.getRoute('/list'), controller.searchRestaurant);

// UPDATE POPULAR DISHES
router.post(
    bRoute.getRoute('/updateDishes'),
    updatePopularDishesValidationSchema,
    validate,
    controller.updatePopularDishes
);

export { router as diningRestaurantRoutes };
