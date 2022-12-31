import { body } from 'express-validator';

const requiredValidation = (column: string, name: string) => {
    return body(column).exists().withMessage(`${name} is required`);
};

const createCategoryValidationSchema = [
    requiredValidation('categoryName', 'categoryName')
        .isLength({ min: 2 })
        .withMessage('Minimum two characters required'),
    requiredValidation('count', 'count')
        .isNumeric()
        .withMessage('Count should be a number'),
];

export { createCategoryValidationSchema };
