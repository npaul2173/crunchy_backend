import { createCuisineValidationSchema } from 'controllers/cuisine/validation';
import { RoleController } from 'controllers/roles';
import { Router } from 'express';
import { validate } from 'utils/library/validate';

const router = Router();
const roleController = new RoleController();
const getRoute = (uri?: string) => `/roles${uri}`;

// CREATE CUSTOMER
router.post(
    getRoute('/create'),
    // createCuisineValidationSchema,
    // validate,
    roleController.createUserType
);

// GET ALL CUISINES
router.get(getRoute('/'), roleController.getAllUsers);

export { router as routerTypes };
