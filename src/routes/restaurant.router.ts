import { createRestaurant, getAllRestaurants } from 'controllers/restaurant';
import { createRestaurantValidationSchema } from 'controllers/restaurant/validation';
import { Router } from 'express';
import { validate } from 'utils/library/validate';

const router = Router();
const getRoute = (uri?: string) => `/restaurants${uri}`;

// CREATE CUSTOMER
router.post(
    getRoute('/create'),
    createRestaurantValidationSchema,
    validate,
    createRestaurant
);

// GET ALL CUSTOMERS
router.get(getRoute('/'), getAllRestaurants);

export { router as restaurantRoutes };
