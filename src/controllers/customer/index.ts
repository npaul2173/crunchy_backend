import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomerModel } from 'models/customer/model';
import HttpException from 'utils/exception/http.exception';
import { JsonResponse } from 'utils/interfaces';
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

const checkMobileAlreadyExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { phone } = { ...req.body } as { phone: string };
    const response = await CustomerModel.findOne({
        where: { phone },
    });

    if (response) {
        const response: JsonResponse = {
            status: false,
            message: 'User already exists with this Phone number',
        };
        res.status(StatusCodes.CONFLICT).json(response);
    } else next();
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
export { createCustomer, getAllCustomers, checkMobileAlreadyExists };
