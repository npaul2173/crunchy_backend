import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { DiningRestaurantCreateProps } from './interface';
import DiningRestaurantService from './service';

class DiningRestaurantController {
    public async createDiningRestaurant(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const service = new DiningRestaurantService();
            const inputData = { ...req.body } as DiningRestaurantCreateProps;
            const customerResponse = await service.create(inputData, req);
            res.status(StatusCodes.OK).json({
                status: true,
                data: customerResponse,
            });
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Cannot Create Dining Restaurant'
                )
            );
        }
    }

    public async getAll(_req: Request, res: Response, next: NextFunction) {
        const service = new DiningRestaurantService();

        try {
            const nodes = await service.findAll();
            res.status(StatusCodes.OK).json({ nodes });
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Unable to retrieve partners'
                )
            );
        }
    }
}

export default DiningRestaurantController;
