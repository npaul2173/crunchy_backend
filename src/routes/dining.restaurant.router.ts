import { Router } from 'express';
import multer from 'multer';
import { validate } from 'utils/library/validate';
import os from 'os';
import { BaseRoute } from 'utils/library/utils';
import DiningRestaurantController from 'controllers/Dining/Restaurants';
import {
    validateFile,
    createDiningRestaurantValidationSchema,
} from 'models/Dining/DiningRestaurants/validation';
import { StatusCodes } from 'http-status-codes';

const router = Router();
const controller = new DiningRestaurantController();

const upload = multer({ dest: os.tmpdir() });
const bRoute = new BaseRoute('diningRestaurant');

// CREATE CUSTOMER
router.post(
    bRoute.getRoute('/create'),
    upload.single('photos'),

    createDiningRestaurantValidationSchema,
    validate,
    // function (req: any, res: any) {
    //     res.status(StatusCodes.OK).send({
    //         message: 'Receivedadas',
    //         file: req.file?.mimetype,
    //     });
    // }

    controller.createDiningRestaurant
);

router.post(
    bRoute.getRoute('/stats'),
    upload.single('uploaded_file'),
    function (req, res) {
        res.status(StatusCodes.OK).send({
            message: 'Received',
            file: req.file?.mimetype,
        });
    }
);

// GET ALL CUISINES
// router.get(getRoute('/'), controller.getAllCuisines);

// SOFT DELETE CUISINE
// router.post(getRoute('/delete'), controller.deleteCuisine);
export { router as diningRestaurantRoutes };
