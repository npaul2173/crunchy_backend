import { createCategory, getAllCategories } from 'controllers/mart/categories';
import { createCategoryValidationSchema } from 'controllers/mart/categories/validation';
import { Router } from 'express';
import { BaseRoute } from 'utils/library/utils';
import { validate } from 'utils/library/validate';

const router = Router();
const bRoute = new BaseRoute('categories');
const create = bRoute.getRoute('/create');
const getAll = bRoute.getRoute('/');

//Create CATEGORY
router.post(create, createCategoryValidationSchema, validate, createCategory);

//GET ALL CATEGORIES
router.get(getAll, getAllCategories);

export { router as categoryRoutes };
