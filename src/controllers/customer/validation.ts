import { body } from 'express-validator';

const requiredValidation = (column: string, name: string) => {
    return body(column).exists().withMessage(`${name} is required`);
};

const createCustomerValidationSchema = [
    requiredValidation('phone', 'Phone number')
        .isLength({ min: 10 })
        .withMessage('Minimum 10 characters required'),
    requiredValidation('otp', 'OTP'),
];

export { createCustomerValidationSchema };
