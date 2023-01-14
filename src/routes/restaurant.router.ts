import {
    createRestaurant,
    deleteRestaurant,
    getAllRestaurants,
} from 'controllers/restaurant';
import { createRestaurantValidationSchema } from 'controllers/restaurant/validation';
import { Router } from 'express';
import { validate } from 'utils/library/validate';

const router = Router();
const getRoute = (uri?: string) => `/restaurants${uri}`;

// CREATE RESTAURANT
router.post(
    getRoute('/create'),
    createRestaurantValidationSchema,
    validate,
    createRestaurant
);

// GET ALL RESTAURANTS
router.get(getRoute('/'), getAllRestaurants);

//REMOVE RESTAURANT
router.get(getRoute('/remove'), deleteRestaurant);

export { router as restaurantRoutes };
