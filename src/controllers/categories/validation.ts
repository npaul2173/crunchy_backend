import { body } from 'express-validator';

const requiredValidation = (column: string, name: string) => {
    return body(column).exists().withMessage(`${name} is required`);
};

const createCategoryValidationSchema = [
    requiredValidation('categoryName', 'categoryName')
        .isString()
        .withMessage('Category name should be a string'),
    requiredValidation('count', 'count')
        .isNumeric()
        .withMessage('Count should be a number'),
    body('description')
        .isString()
        .withMessage('Description should be a string')
        .optional(),
];

export { createCategoryValidationSchema };
