import { NextFunction, Request, Response } from 'express';
import { Foods } from 'models/foods.model';
import { Op } from 'sequelize';

// Create and Save a new Tutorial
const createFood = (req: Request, res: Response, next: NextFunction) => {
    const food = {
        title: req.body.title,
        description: req.body.description,
    };

    // Save Tutorial in the database
    Foods.create(food)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Tutorial.',
            });
        });
};

// Retrieve all Tutorials from the database.
const findAllFoods = (req: Request, res: Response, next: NextFunction) => {
    const title = req.query.title;
    const where = title ? { title: { [Op.iLike]: `%${title}%` } } : undefined;

    Foods.findAll({ where })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving tutorials.',
            });
        });
};

export { createFood, findAllFoods };
