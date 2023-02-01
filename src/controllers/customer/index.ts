import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomerModel } from 'models/customer/model';
import HttpException from 'utils/exception/http.exception';
import { JsonResponse } from 'utils/interfaces';
import { CustomerCreateProps } from './interface';
import CustomerService from './service';
import jwt from 'jsonwebtoken';

const loginRegisterCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const customerService = new CustomerService();

        const inputData = req.body as CustomerCreateProps;
        const { response, created } = await customerService.create(inputData);

        if (inputData.otp === '123456') {
            const token = jwt.sign(
                { id: response.dataValues.id },
                process.env.SECRET_KEY_AUTH!,
                {
                    expiresIn: 86400, // 24 hours
                }
            );

            res.status(StatusCodes.ACCEPTED).json({
                status: true,
                message: 'Login Successful',
                data: { token, response, created },
            } as JsonResponse);
        } else {
            res.status(StatusCodes.ACCEPTED).json({
                status: false,
                message: 'Invalid OTP was entered',
            } as JsonResponse);
        }
    } catch (error) {
        next(
            new HttpException(StatusCodes.BAD_REQUEST, '❌ Cannot Create User')
        );
    }
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    let { authorization } = req.headers;

    const bearer = authorization?.split(' ');

    if (bearer) {
        const bearerToken = bearer?.[1];

        jwt.verify(bearerToken, process.env.SECRET_KEY_AUTH!, (err) => {
            if (err) {
                return res.status(401).send({
                    message: 'Unauthorized!',
                });
            }
            next();
        });
    } else {
        res.status(StatusCodes.FORBIDDEN).json({
            status: false,
            message: 'Token not provided',
        } as JsonResponse);
    }
};

const checkMobileAlreadyExists = async (req: Request, res: Response) => {
    const { phone } = { ...req.body } as { phone: string };
    const response = await CustomerModel.findOne({
        where: { phone },
    });

    if (response) {
        const response: JsonResponse = {
            status: true,
            message: 'User exists',
        };
        res.status(StatusCodes.OK).json(response);
    } else {
        const response: JsonResponse = {
            status: false,
            message: 'No user with this Phone number',
        };
        res.status(StatusCodes.OK).json(response);
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
export {
    getAllCustomers,
    checkMobileAlreadyExists,
    loginRegisterCustomer,
    verifyToken,
};
