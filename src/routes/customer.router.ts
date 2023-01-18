import { createCustomer, getAllCustomers } from 'controllers/customer';
import { createCustomerValidationSchema } from 'controllers/customer/validation';
import { Router } from 'express';
import { BaseRoute } from 'utils/library/utils';
import { validate } from 'utils/library/validate';

const router = Router();
const bRoute = new BaseRoute('/customers');
// CREATE CUSTOMER
router.post(
    bRoute.getRoute('/create'),
    createCustomerValidationSchema,
    validate,
    createCustomer
);

// GET ALL CUSTOMERS
router.get(bRoute.getRoute('/'), getAllCustomers);

export { router as customerRoutes };
