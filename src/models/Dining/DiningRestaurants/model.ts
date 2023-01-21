import { sequel } from 'models/index';
import { DataTypes } from 'sequelize';
import { DiningImagesModel } from './Image/model';

const MODEL_NAME: string = 'diningRestaurant';

export const DiningRestaurantModel = sequel.define(
    MODEL_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        restaurantName: { type: DataTypes.STRING, allowNull: false },
        street: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING },
        landmark: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        pincode: { type: DataTypes.STRING },
        pocketPinch: { type: DataTypes.STRING },
        contactNumber: { type: DataTypes.STRING },
        alternateContact: { type: DataTypes.STRING },
        popularDishes: { type: DataTypes.STRING },
        features: { type: DataTypes.STRING },
        menu: { type: DataTypes.STRING },
    },
    {
        timestamps: true,
        paranoid: true,
        deletedAt: 'inActive',
    }
);

DiningRestaurantModel.hasMany(DiningImagesModel);
