import { NextFunction, Request, Response } from 'express';
import { requiredValidation } from 'utils/library/validate';

const createDiningRestaurantValidationSchema = [
    requiredValidation('restaurantName', 'Restaurant name').isLength({
        max: 30,
    }),
    requiredValidation('street', 'Street name'),
    requiredValidation('landmark', 'Landmark'),
    requiredValidation('state', 'State'),
    requiredValidation('pincode', 'pincode'),
    requiredValidation('contactNumber', 'Contact number')
        .isLength({ min: 10 })
        .withMessage('Minimum ten digits required'),
];

export { createDiningRestaurantValidationSchema };
