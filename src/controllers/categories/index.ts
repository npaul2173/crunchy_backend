import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { CategoryCreateProps } from './interface';
import CategoryService from './service';

const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const categoryService = new CategoryService();
    try {
        const inputData = req.body as CategoryCreateProps;
        const response = await categoryService.create(inputData);
        res.status(StatusCodes.CREATED).json({ data: response });
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Cannot Create Category'
            )
        );
    }
};

const getAllCategories = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const categoryService = new CategoryService();
    try {
        const response = await categoryService.findAll();
        res.status(StatusCodes.OK).json({ nodes: response });
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Unable to retrieve categories'
            )
        );
    }
};

export { createCategory, getAllCategories };
