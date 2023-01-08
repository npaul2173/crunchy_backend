import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PartnerProps } from 'models/partner/interface';
import { PartnerModel } from 'models/partner/model';
import HttpException from 'utils/exception/http.exception';
import Logging from 'utils/library/logging';

class PartnerController {
    public async createPartner(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const inputData = {
                ...req.body,
                isEmailVerified: false,
                isMobileVerified: false,
            } as Omit<PartnerProps, 'id'>;
            const customerResponse = await PartnerModel.create(inputData);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: customerResponse,
            });
        } catch (error) {
            next(
                new HttpException(
                    StatusCodes.BAD_REQUEST,
                    '❌ Cannot Create partner'
                )
            );
        }
    }

    // public async deleteCuisine(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) {
    //     const { id } = { ...req.body } as { id: string };
    //     try {
    //         const response = await CuisinesModel.destroy({ where: { id } });
    //         res.status(StatusCodes.OK).json({ success: !!response });
    //     } catch (error) {
    //         next(
    //             new HttpException(
    //                 StatusCodes.BAD_REQUEST,
    //                 '❌ Unable to retrieve cuisines'
    //             )
    //         );
    //     }
    // }

    public async getAllPartners(
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const nodes = await PartnerModel.findAll();
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

export { PartnerController };
