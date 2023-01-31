import {
    createCategory,
    getAllCategories,
    categoryBulkCreate,
} from 'controllers/mart/categories';
import { createCategoryValidationSchema } from 'controllers/mart/categories/validation';
import { Router } from 'express';
import multer from 'multer';
import { BaseRoute } from 'utils/library/utils';
import { validate } from 'utils/library/validate';
import os from 'os';

const router = Router();
const upload = multer({ dest: os.tmpdir() });
const bRoute = new BaseRoute('categories');
const create = bRoute.getRoute('/create');
const bulCreate = bRoute.getRoute('/bulkCreate');
const getAll = bRoute.getRoute('/');

console.log({ create });

//Create CATEGORY
router.post(create, createCategoryValidationSchema, validate, createCategory);

//BULK CREATE CATEGORIES
router.post(bulCreate, upload.single('csvFile'), categoryBulkCreate);

//GET ALL CATEGORIES
router.get(getAll, getAllCategories);

export { router as categoryRoutes };
