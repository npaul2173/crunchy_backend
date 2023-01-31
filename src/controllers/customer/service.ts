import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomerModel } from 'models/customer/model';
import { JsonResponse } from 'utils/interfaces';
import { CustomerCreateProps } from './interface';

class CustomerService {
    public async create(data: CustomerCreateProps) {
        try {
            const customerResponse = CustomerModel.create(data);
            return customerResponse;
        } catch (error) {
            throw new Error('❌ Unable to create 🖊️ user ');
        }
    }

    public findAll() {
        try {
            const nodes = CustomerModel.findAll();
            return nodes;
        } catch (error) {
            throw new Error(
                '❌ Some error occurred while retrieving 🖊️ customers '
            );
        }
    }

    public checkMobileAlreadyExists = async (
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
}

export default CustomerService;
