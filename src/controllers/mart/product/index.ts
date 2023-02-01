import { parse } from 'csv-parse';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { GetProductProps } from 'models/mart/product/interface';
import HttpException from 'utils/exception/http.exception';
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
    const inputData = _req.body as GetProductProps;
    try {
        const response = await productService.findAll(inputData);
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

const createBulkProduct = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const productService = new ProductService();
    try {
        let dataArray: ProductCreateProps[] = [];
        const readableStream = fs.createReadStream(_req.file?.path!);
        readableStream
            .pipe(parse({ from_line: 2 }))
            .on('data', async (item) => {
                dataArray.push({
                    productName: item[0],
                    description: item[1],
                    price: item[2],
                    quantity: item[3],
                    categoryId: item[4],
                    images: item[5],
                });
            })
            .on('end', async () => {
                const response = await productService.createMultiple(dataArray);
                res.status(StatusCodes.CREATED);
            })
            .on('error', (error) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            });
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Cannot Create Products'
            )
        );
    }
};

export { createProduct, getAllProducts };
