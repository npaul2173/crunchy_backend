import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import Logging from 'utils/library/logging';
import {
    DiningRestaurantCreateProps,
    DiningRestaurantSearchInputProps,
    PopularDishesData,
} from './interface';
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
            await service.updateDishes({ id, popularDishes });
            res.status(StatusCodes.OK).json({
                status: true,
                message: 'Dishes updated',
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

    public async searchRestaurant(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const service = new DiningRestaurantService();
        const input = req.body as DiningRestaurantSearchInputProps;
        try {
            const response = await service.search(input);
            res.status(StatusCodes.OK).json({
                status: true,
                // input,
                response: { count: response.count, nodes: response.rows },
            });
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Unable to retrieve Dining Restaurant'
                )
            );
        }
    }
}

export default DiningRestaurantController;
