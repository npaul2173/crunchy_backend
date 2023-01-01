import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserTypesProps } from 'models/userTypes/interface';
import { UserTypesModel } from 'models/userTypes/model';
import HttpException from 'utils/exception/http.exception';

class UserTypeController {
    public async createUserType(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const inputData = {
                ...req.body,
            } as Omit<UserTypesProps, 'id'>;

            const response = await UserTypesModel.create(inputData);
            res.status(StatusCodes.CREATED).json({ data: response });
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Cannot Create User Type'
                )
            );
        }
    }

    public async getAllUsers(_req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserTypesModel.findAll();
            res.status(StatusCodes.OK).json({ nodes: response });
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Unable to retrieve User Types'
                )
            );
        }
    }
}

export { UserTypeController };
