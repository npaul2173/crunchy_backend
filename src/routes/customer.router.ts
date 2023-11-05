import {
    checkMobileAlreadyExists,
    getAllCustomers,
    loginRegisterCustomer,
    verifyToken,
} from 'controllers/customer';
import {
    checkCustomerVSchema,
    createCustomerVSchema,
} from 'controllers/customer/validation';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseRoute } from 'utils/library/utils';
import { validate } from 'utils/library/validate';

const router = Router();
const bRoute = new BaseRoute('customers');

// CREATE CUSTOMER
router.post(
    bRoute.getRoute('/login'),
    createCustomerVSchema,
    validate,
    loginRegisterCustomer
);

// Verify user token
router.post(bRoute.getRoute('/authorize'), verifyToken, (_req, res) =>
    res
        .status(StatusCodes.OK)
        .json({ status: true, message: 'Token authorized' })
);

// Check if customer already exists
router.post(
    bRoute.getRoute('/checkCustomer'),
    checkCustomerVSchema,
    validate,
    checkMobileAlreadyExists
);
// GET ALL CUSTOMERS
router.get(bRoute.getRoute('/'), getAllCustomers);

export { router as customerRoutes };
