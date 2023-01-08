import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CuisinesModel } from 'models/cuisine/model';
import HttpException from 'utils/exception/http.exception';
import { CuisineCreateProps } from './interface';
import CuisineService from './service';

class CuisineController {
    public async createCuisine(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const cuisineService = new CuisineService();
        try {
            const inputData = {
                ...req.body,
                isCuisineVerified: true,
            } as CuisineCreateProps;
            const node = await cuisineService.findCuisine(
                inputData.cuisineName
            );

            if (node !== null)
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                    message: 'Cuisine already exists!',
                });
            else {
                const response = await cuisineService.create(inputData);
                res.status(StatusCodes.CREATED).json({ data: response });
            }
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Cannot Create Cuisine'
                )
            );
        }
    }

    public async deleteCuisine(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = { ...req.body } as { id: string };
        try {
            const response = await CuisinesModel.destroy({ where: { id } });
            res.status(StatusCodes.OK).json({ success: !!response });
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Unable to retrieve cuisines'
                )
            );
        }
    }

    public async getAllCuisines(
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        const cuisineService = new CuisineService();
        try {
            const response = await cuisineService.findAll();
            res.status(StatusCodes.OK).json({ nodes: response });
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Unable to retrieve cuisines'
                )
            );
        }
    }
}

export { CuisineController };
