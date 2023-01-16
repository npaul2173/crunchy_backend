import { ProductModel } from 'models/product/model';
import { DataTypes } from 'sequelize';
import { sequel } from '..';

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
    },
    {
        timestamps: true,
    }
);

CategoryModel.hasMany(ProductModel);
