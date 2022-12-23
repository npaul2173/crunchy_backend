import { createCustomer, getAllCustomers } from 'controllers/customer';
import { createCustomerValidationSchema } from 'controllers/customer/validation';
import { Router } from 'express';
import { validate } from 'utils/library/validate';

const router = Router();
const getRoute = (uri?: string) => `/customers${uri}`;

// CREATE CUSTOMER
router.post(
    getRoute('/create'),
    createCustomerValidationSchema,
    validate,
    createCustomer
);

// GET ALL CUSTOMERS
router.get(getRoute('/'), getAllCustomers);

export { router as customerRoutes };
