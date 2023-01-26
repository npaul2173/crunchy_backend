import { createProduct, getAllProducts } from 'controllers/mart/product';
import {
    createProductValidationSchema,
    getProductValidationSchema,
} from 'controllers/mart/product/validation';
import { Router } from 'express';
import { BaseRoute } from 'utils/library/utils';
import { validate } from 'utils/library/validate';

const router = Router();
const bRoute = new BaseRoute('product');
const create = bRoute.getRoute('/create');
const getAll = bRoute.getRoute('/');
const getRoute = (uri?: string) => `/product${uri}`;

//Create PRODUCT
router.post(create, createProductValidationSchema, validate, createProduct);

//GET ALL PRODUCTS
router.post(getAll, getProductValidationSchema, validate, getAllProducts);

export { router as productRoutes };
