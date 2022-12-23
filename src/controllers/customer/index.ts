import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { CustomerCreateProps } from './interface';
import CustomerService from './service';

// Create and Save a new Tutorial
const createCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const customerService = new CustomerService();

    try {
        const inputData = req.body as CustomerCreateProps;
        const response = await customerService.create(inputData);
        res.status(StatusCodes.CREATED).json({ data: response });
    } catch (error) {
        next(
            new HttpException(StatusCodes.BAD_REQUEST, '❌ Cannot Create User')
        );
    }
};

const getAllCustomers = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const customerService = new CustomerService();
    try {
        const response = await customerService.findAll();
        res.status(StatusCodes.OK).json({ nodes: response });
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Unable to retrieve customers'
            )
        );
    }
};
export { createCustomer, getAllCustomers };
