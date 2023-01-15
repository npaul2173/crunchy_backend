import { body } from 'express-validator';
import { requiredValidation } from 'utils/library/validate';

const createPartnerValidation = [
    requiredValidation('regMobileNumber', 'Registered mobile number')
        .isLength({ min: 10 })
        .withMessage('Minimum ten digits required'),
    requiredValidation('secondaryContactNumber', 'Secondary Contact Number'),
    requiredValidation('partnerName', 'Partner name'),
    requiredValidation('email', 'Email'),
    requiredValidation('roleId', 'User Type'),
];

export { createPartnerValidation };
