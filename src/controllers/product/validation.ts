import { body } from 'express-validator';

const requiredValidation = (column: string, name: string) => {
    return body(column).exists().withMessage(`${name} is required`);
};

const createProductValidationSchema = [
    requiredValidation('productName', 'productName')
        .isString()
        .withMessage('Product name should be a string'),
    requiredValidation('quantity', 'price')
        .isNumeric()
        .withMessage('quantity should be a number'),
    requiredValidation('price', 'price')
        .isNumeric()
        .withMessage('price should be a number'),
    requiredValidation('categoryId', 'categoryId')
        .isNumeric()
        .withMessage('categoryId should be a number'),
    body('description')
        .isString()
        .withMessage('Description should be a string')
        .optional(),
];

export { createProductValidationSchema };
