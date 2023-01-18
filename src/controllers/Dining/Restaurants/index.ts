import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { DiningRestaurantCreateProps } from './interface';
import DiningRestaurantService from './service';
import fs from 'fs';

class DiningRestaurantController {
    // public diningResService: DiningRestaurantService;

    // constructor() {
    //     this.diningResService = new DiningRestaurantService();
    // }

    public async createDiningRestaurant(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const readableStream = fs.createReadStream(req.file?.path!);
            const service = new DiningRestaurantService();
            const inputData = {
                ...req.body,
            } as DiningRestaurantCreateProps;
            const customerResponse = await service.create(inputData);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: customerResponse,
            });
            res.status(StatusCodes.OK).json({
                data: 'customerResponse',
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

    // public async getAllPartners(
    //     _req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) {
    //     try {
    //         const nodes = await PartnerModel.findAll();
    //         res.status(StatusCodes.OK).json({ nodes });
    //     } catch (error) {
    //         next(
    //             new HttpException(
    //                 StatusCodes.BAD_REQUEST,
    //                 '❌ Unable to retrieve partners'
    //             )
    //         );
    //     }
    // }
}

export default DiningRestaurantController;
