import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomerModel } from 'models/customer/model';
import { JsonResponse } from 'utils/interfaces';
import { CustomerCreateProps } from './interface';

class CustomerService {
    public async create(data: CustomerCreateProps) {
        try {
            const inputData = {
                ...data,
                isEmailVerified: false,
                isPhoneVerified: false,
            } as CustomerCreateProps;
            const customerResponse = CustomerModel.create(inputData);
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
}

export default CustomerService;
