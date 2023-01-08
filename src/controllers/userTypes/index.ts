import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserTypesProps } from 'models/userTypes/interface';
import { UserTypeModel } from 'models/userTypes/model';
import HttpException from 'utils/exception/http.exception';
import Logging from 'utils/library/logging';

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

            Logging.warning({ inputData });
            const response = await UserTypeModel.create(inputData);
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
            const response = await UserTypeModel.findAll();
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
