import { body } from 'express-validator';

const requiredValidation = (column: string, name: string) => {
    return body(column).exists().withMessage(`${name} is required`);
};

const createCustomerValidationSchema = [
    requiredValidation('name', 'Name')
        .isLength({ min: 2 })
        .withMessage('Minimum two characters required'),
    requiredValidation('phone', 'Phone number')
        .isLength({ min: 10 })
        .withMessage('Minimum 10 characters required'),
    body('email').isEmail(),
];

export { createCustomerValidationSchema };
