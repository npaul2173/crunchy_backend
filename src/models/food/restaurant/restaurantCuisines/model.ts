import { CuisinesModel, CUISINE_MODEL } from 'models/cuisine/model';
import { sequel } from 'models/index';
import { DataTypes } from 'sequelize';
import { RestaurantModel, RESTAURANT_MODEL } from '../model';

const RESTAURANT_CUISINE_MODEL: string = 'restaurantCuisines';

export const restaurantCuisinesModel = sequel.define(
    RESTAURANT_CUISINE_MODEL,
    {}
);

RestaurantModel.belongsToMany(CuisinesModel, {
    through: RESTAURANT_CUISINE_MODEL,
    as: CUISINE_MODEL,
    foreignKey: 'restaurantId',
});
CuisinesModel.belongsToMany(RestaurantModel, {
    through: RESTAURANT_CUISINE_MODEL,
    as: RESTAURANT_MODEL,
    foreignKey: 'cuisineId',
});
