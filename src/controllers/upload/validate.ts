import { NextFunction, Request, Response } from 'express';

// Function to validate file
const validateSingleImage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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

const validateMultipleImage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const expectedFileType = ['png', 'jpg', 'jpeg'];
    if (!req.files || req.files.length < 1 || req.files.length > 10)
        return res.json({
            success: false,
            message: 'Minimum 1 Images required, max 10',
        });

    const files: any = req.files;
    const invalidFiles = files.filter((item: any) => {
        const fileExtensions = item.mimetype.split('/').pop();
        return !expectedFileType.includes(fileExtensions!);
    });

    if (invalidFiles.length > 0) {
        return res.json({
            success: false,
            message: 'Few files are not valid',
            invalidFiles,
        });
    }
    next();
};

export { validateSingleImage, validateMultipleImage };
