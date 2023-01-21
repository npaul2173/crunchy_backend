import { ProductModel } from 'models/mart/product/model';
import { DataTypes } from 'sequelize';
import { sequel } from '../..';

const MODEL_NAME: string = 'category';
export const CategoryModel = sequel.define(
    MODEL_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        categoryName: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING },
        count: { type: DataTypes.INTEGER, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
    },
    {
        timestamps: true,
        paranoid: true,
        deletedAt: 'softDelete',
    }
);

CategoryModel.hasMany(ProductModel);
