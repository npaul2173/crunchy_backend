import { createFood, findAllFoods } from 'controllers/foods/foods.controller';
import { validationSchema } from 'controllers/foods/validation';
import { Router } from 'express';
import { Controller } from 'utils/interfaces/controller';
import { validate } from 'utils/library/validate';

const router = Router();

// router.get("/", getFoods);
// const foodControllers:Controller[] = [
//     {path:'/create' , router: create}
// ]

router.post('/foods/create', validationSchema, validate, createFood);
router.get('/foods', findAllFoods);

export { router };
