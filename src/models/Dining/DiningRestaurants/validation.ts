import { NextFunction, Request, Response } from 'express';
import { requiredValidation } from 'utils/library/validate';

const createDiningRestaurantValidationSchema = [
    requiredValidation('restaurantName', 'Restaurant name').isLength({
        max: 30,
    }),
    requiredValidation('street', 'Street name'),
    requiredValidation('landmark', 'Landmark'),
    requiredValidation('state', 'State'),
    requiredValidation('pincode', 'pincode'),
    requiredValidation('contactNumber', 'Contact number')
        .isLength({ min: 10 })
        .withMessage('Minimum ten digits required'),
];

const validateFile = (req: Request, res: Response, next: NextFunction) => {
    console.log();

    const expectedFileType = ['png', 'jpg', 'jpeg'];
    if (!req.file)
        return res.json({
            success: false,
            message: 'Minimum one image is required',
        });

    const fileExtensions = req.file.mimetype.split('/').pop();
    if (!expectedFileType.includes(fileExtensions!))
        return res.json({ success: false, message: 'Image file is not valid' });
    next();
};

export { createDiningRestaurantValidationSchema, validateFile };
