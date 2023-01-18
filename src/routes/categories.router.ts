import { createCategory, getAllCategories } from 'controllers/categories';
import { createCategoryValidationSchema } from 'controllers/categories/validation';
import { Router } from 'express';
import { BaseRoute } from 'utils/library/utils';
import { validate } from 'utils/library/validate';

const router = Router();
const bRoute = new BaseRoute('categories');
const create = bRoute.getRoute('/create');
const getAll = bRoute.getRoute('/');

console.log({ create });

//Create CATEGORY
router.post(create, createCategoryValidationSchema, validate, createCategory);

//GET ALL CATEGORIES
router.get(getAll, getAllCategories);

export { router as categoryRoutes };
