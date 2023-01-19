import { CuisinesModel } from 'models/cuisine/model';
import { sequel } from 'models/index';
import { DataTypes } from 'sequelize';
import { DiningRestaurantModel } from '../model';

const MODEL_NAME: string = 'diningCuisines';

export const DiningCuisinesModel = sequel.define(MODEL_NAME, {
    diningRestaurantId: {
        type: DataTypes.INTEGER,
        references: {
            model: DiningRestaurantModel,
            key: 'id',
        },
    },
    cuisineId: {
        type: DataTypes.INTEGER,
        references: {
            model: CuisinesModel,
            key: 'id',
        },
    },
});

DiningRestaurantModel.belongsToMany(CuisinesModel, {
    through: 'diningCuisines',
});
CuisinesModel.belongsToMany(DiningRestaurantModel, {
    through: 'diningCuisines',
});
