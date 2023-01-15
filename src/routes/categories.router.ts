import { createCategory, getAllCategories } from 'controllers/categories';
import { createCategoryValidationSchema } from 'controllers/categories/validation';
import { Router } from 'express';
import { validate } from 'utils/library/validate';

const router = Router();
const getRoute = (uri?: string) => `/categories${uri}`;

//Create CATEGORY
router.post(
    getRoute('/create'),
    createCategoryValidationSchema,
    validate,
    createCategory
);

//GET ALL CATEGORIES
router.get(getRoute('/'), getAllCategories);

export { router as categoryRoutes };
