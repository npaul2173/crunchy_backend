import { createProduct, getAllProducts } from 'controllers/mart/product';
import {
    createProductValidationSchema,
    getProductValidationSchema,
} from 'controllers/mart/product/validation';
import { Router } from 'express';
import { validate } from 'utils/library/validate';

const router = Router();
const getRoute = (uri?: string) => `/product${uri}`;

//Create PRODUCT
router.post(
    getRoute('/create'),
    createProductValidationSchema,
    validate,
    createProduct
);

router.post(
    getRoute('/'),
    getProductValidationSchema,
    validate,
    getAllProducts
);

export { router as productRoutes };
