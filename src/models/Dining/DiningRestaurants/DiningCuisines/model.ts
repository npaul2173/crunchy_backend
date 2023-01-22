import { CuisinesModel, CUISINE_MODEL } from 'models/cuisine/model';
import { sequel } from 'models/index';
import { DataTypes } from 'sequelize';
import { DiningRestaurantModel, DINING_RESTAURANT_MODEL } from '../model';

const DINING_CUISINE_MODEL: string = 'diningCuisines';

export const DiningCuisinesModel = sequel.define(DINING_CUISINE_MODEL, {});

DiningRestaurantModel.belongsToMany(CuisinesModel, {
    through: DINING_CUISINE_MODEL,
    as: CUISINE_MODEL,
    foreignKey: 'diningRestaurantId',
});
CuisinesModel.belongsToMany(DiningRestaurantModel, {
    through: DINING_CUISINE_MODEL,
    as: DINING_RESTAURANT_MODEL,
    foreignKey: 'cuisineId',
});
