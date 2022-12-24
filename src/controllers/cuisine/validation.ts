import { body } from 'express-validator';
import { requiredValidation } from 'utils/library/validate';

const createCuisineValidationSchema = [
    requiredValidation('cuisineName', 'Cuisine name')
        .isLength({ min: 2 })
        .withMessage('Minimum two characters required'),
    requiredValidation('isCuisineVerified', 'isCuisineVerified'),
];

export { createCuisineValidationSchema };
