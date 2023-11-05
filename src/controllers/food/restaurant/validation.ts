import { body } from 'express-validator';
import { requiredValidation } from 'utils/library/validate';

const createRestaurantValidationSchema = [
    requiredValidation('name', 'Name')
        .isLength({ min: 2 })
        .withMessage('Minimum 5 characters required'),
    requiredValidation('type', 'Restaurant type').withMessage(
        'Minimum 5 characters required'
    ),
    requiredValidation('restaurantType', 'Restaurant type').withMessage(
        'Minimum 5 characters required'
    ),
    requiredValidation('rating', 'Rating').withMessage(
        'Minimum 5 characters required'
    ),
    body('invoiceEmail').isEmail(),
];

export { createRestaurantValidationSchema };
