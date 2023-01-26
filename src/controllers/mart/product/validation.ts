import { body, check } from 'express-validator';

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
    requiredValidation('images', 'images')
        .isArray({ min: 1 })
        .custom((images) =>
            images.every((image: string) => typeof image === 'string')
        )
        .withMessage('Should be array of string'),
    body('description')
        .isString()
        .withMessage('Description should be a string')
        .optional(),
];

const getProductValidationSchema = [
    body('productName')
        .isString()
        .withMessage('Product name should be a string')
        .optional(),
];

export { createProductValidationSchema, getProductValidationSchema };
