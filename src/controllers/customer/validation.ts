import { body } from 'express-validator';

const requiredValidation = (column: string, name: string) => {
    return body(column).exists().withMessage(`${name} is required`);
};

const createCustomerVSchema = [
    requiredValidation('phone', 'Phone number')
        .isLength({ min: 10 })
        .withMessage('Minimum 10 characters required'),
    requiredValidation('otp', 'OTP'),
];

const checkCustomerVSchema = [
    requiredValidation('phone', 'Phone number').isLength({ min: 10 }),
];

export { createCustomerVSchema, checkCustomerVSchema };
