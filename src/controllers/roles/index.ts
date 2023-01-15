import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RoleProps } from 'models/role/interface';
import { RoleModel } from 'models/role/model';
import HttpException from 'utils/exception/http.exception';

class RoleController {
    public async createUserType(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const inputData = {
                ...req.body,
            } as Omit<RoleProps, 'id'>;

            const response = await RoleModel.create(inputData);
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
            const response = await RoleModel.findAll();
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

export { RoleController };
