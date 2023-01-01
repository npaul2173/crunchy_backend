import { createCuisineValidationSchema } from 'controllers/cuisine/validation';
import { UserTypeController } from 'controllers/partnerTypes';
import { Router } from 'express';
import { validate } from 'utils/library/validate';

const router = Router();
const userTypeController = new UserTypeController();
const getRoute = (uri?: string) => `/userTypes${uri}`;

// CREATE CUSTOMER
router.post(
    getRoute('/create'),
    // createCuisineValidationSchema,
    // validate,
    userTypeController.createUserType
);

// GET ALL CUISINES
router.get(getRoute('/'), userTypeController.getAllUsers);

export { router as userTypeRoutes };
