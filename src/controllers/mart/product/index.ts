import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Model } from 'sequelize';
import HttpException from 'utils/exception/http.exception';
import Logging from 'utils/library/logging';
import { ProductCreateProps } from './interface';
import ProductService from './service';

const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const productService = new ProductService();
    try {
        const inputData = req.body as ProductCreateProps;
        const response = await productService.create(inputData);
        if (response) {
            if ('categoryExist' in response && !response.categoryExist) {
                res.status(StatusCodes.NOT_FOUND).json({
                    status: false,
                    error: 'Category does not exist',
                });
            } else {
                res.status(StatusCodes.CREATED).json({
                    status: true,
                    data: response,
                });
            }
        } else {
            res.status(StatusCodes.CONFLICT).json({
                status: false,
                error: 'Product already exist',
            });
        }
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Cannot Create Product'
            )
        );
    }
};

const getAllProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const productService = new ProductService();
    try {
        const response = await productService.findAll();
        res.status(StatusCodes.OK).json({ status: true, nodes: response });
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Unable to retrieve products'
            )
        );
    }
};

export { createProduct, getAllProducts };
