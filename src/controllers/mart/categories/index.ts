import { CuisineCreateProps } from 'controllers/cuisine/interface';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { CategoryCreateProps } from './interface';
import CategoryService from './service';
import fs from 'fs';
import { parse } from 'csv-parse';
import Logging from 'utils/library/logging';

const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const categoryService = new CategoryService();
    try {
        const inputData = req.body as CategoryCreateProps;
        const { categoryResponse, created } = await categoryService.create(
            inputData
        );
        if (created) {
            res.status(StatusCodes.CREATED).json({
                success: true,
                data: categoryResponse,
            });
        } else {
            res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: 'Category already exists',
            });
        }
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
        res.status(StatusCodes.OK).json({ success: true, nodes: response });
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Unable to retrieve categories'
            )
        );
    }
};

const categoryBulkCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const categoryService = new CategoryService();
    try {
        let dataArray: CategoryCreateProps[] = [];
        const readableStream = fs.createReadStream(req.file?.path!);
        readableStream
            .pipe(parse({ delimiter: ',', from_line: 2 }))
            .on('data', async (item) => {
                dataArray.push({
                    categoryName: item[0],
                    description: item[1],
                    count: item[2],
                    image: item[3],
                });
            })
            .on('end', async () => {
                const response = await categoryService.createMultiple(
                    dataArray
                );
                res.status(StatusCodes.CREATED).json({ data: response });
            })
            .on('error', (error) => {
                Logging.error(error.message);
            });
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Cannot Create Category'
            )
        );
    }
};

export { createCategory, getAllCategories, categoryBulkCreate };
