import { Router } from 'express';
import multer from 'multer';
import { validate } from 'utils/library/validate';
import os from 'os';
import { BaseRoute } from 'utils/library/utils';
import DiningRestaurantController from 'controllers/Dining/Restaurants';
import { createDiningRestaurantValidationSchema } from 'models/Dining/DiningRestaurants/validation';
import { validateMultipleImage } from 'controllers/upload/validate';

const router = Router();
const controller = new DiningRestaurantController();

const upload = multer({ dest: os.tmpdir() });
const bRoute = new BaseRoute('diningRestaurant');

// CREATE CUSTOMER
router.post(
    bRoute.getRoute('/create'),
    upload.array('photos', 10),
    createDiningRestaurantValidationSchema,
    validate,
    validateMultipleImage,
    controller.createDiningRestaurant
);

// router.post(
//     bRoute.getRoute('/stats'),
//     upload.single('uploaded_file'),
//     function (req, res) {
//         res.status(StatusCodes.OK).send({
//             message: 'Received',
//             file: req.file?.mimetype,
//         });
//     }
// );

// GET ALL CUISINES
router.get(bRoute.getRoute('/'), controller.getAll);

export { router as diningRestaurantRoutes };
