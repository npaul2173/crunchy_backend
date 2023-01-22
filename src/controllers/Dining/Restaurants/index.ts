import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { DiningRestaurantCreateProps, PopularDishesData } from './interface';
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
            res.status(
                customerResponse.status
                    ? StatusCodes.OK
                    : StatusCodes.UNPROCESSABLE_ENTITY
            ).json({ ...customerResponse });
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Cannot Create Dining Restaurant'
                )
            );
        }
    }
    public async updatePopularDishes(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const service = new DiningRestaurantService();
            const { id, popularDishes } = { ...req.body } as PopularDishesData;
            const response = await service.updateDishes({ id, popularDishes });
            res.status(StatusCodes.OK).json({
                status: true,
                data: response,
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
