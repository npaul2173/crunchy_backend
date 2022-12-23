import { body } from 'express-validator';

const validationSchema = [
    body('title')
        .exists()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Minimum two characters required'),
    body('description').exists().withMessage('Description is required'),
];

export { validationSchema };
