import { DataTypes } from 'sequelize';
import { sequel } from '../..';

const MODEL_NAME: string = 'restaurant';
export const RestaurantModel = sequel.define(
    MODEL_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.STRING,
        },
        distance: {
            type: DataTypes.STRING,
        },
        duration: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        restaurantType: {
            type: DataTypes.STRING,
        },
        cuisineType: {
            type: DataTypes.STRING,
        },
        invoiceEmail: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    }
);
