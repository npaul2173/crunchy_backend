import { createProduct, getAllProducts } from 'controllers/product';
import { createProductValidationSchema } from 'controllers/product/validation';
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

router.get(getRoute('/'), getAllProducts);

export { router as productRoutes };
