import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { RestaurantCreateProps } from './interface';
import RestaurantService from './service';

const createRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const restaurantService = new RestaurantService();
    try {
        const inputData = req.body as RestaurantCreateProps;
        const response = await restaurantService.create(inputData);
        res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            message: 'Restaurant created succesfully',
            data: response,
        });
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Cannot Create Restaurant'
            )
        );
    }
};

const getAllRestaurants = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const restaurantService = new RestaurantService();
    try {
        const response = await restaurantService.findAll();
        res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            message: 'Restaurants fetched succesfully !',
            data: response,
        });
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Unable to retrieve restaurants'
            )
        );
    }
};

const deleteRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const restaurantService = new RestaurantService();
    try {
        const { id } = { ...req.body } as { id: string };
        const response = await restaurantService.delete(id);
        res.status(StatusCodes.OK).json({ nodes: response });
    } catch (error) {
        next(
            new HttpException(
                StatusCodes.BAD_REQUEST,
                '❌ Unable to remove restaurant'
            )
        );
    }
};
export { createRestaurant, getAllRestaurants, deleteRestaurant };
