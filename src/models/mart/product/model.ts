import { allow } from 'joi';
import { DataTypes } from 'sequelize';
import { sequel } from '../..';

const MODEL_NAME: string = 'product';
export const ProductModel = sequel.define(
    MODEL_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: { type: DataTypes.STRING, unique: true, allowNull: false },
        quantity: { type: DataTypes.FLOAT },
        price: { type: DataTypes.FLOAT, allowNull: false },
        description: { type: DataTypes.STRING },
        categoryId: { type: DataTypes.INTEGER },
        // relatableProduct: { type: DataTypes.INTEGER }
    },
    { timestamps: true, paranoid: true, deletedAt: 'softDelete' }
);

const DERIVED_MODEL_NAME: string = 'derived_product';
export const DerivedProductModel = sequel.define(
    DERIVED_MODEL_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.FLOAT, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        description: { type: DataTypes.STRING },
        categoryId: { type: DataTypes.INTEGER },
        productId: {
            type: DataTypes.INTEGER,
        },
    },
    { timestamps: true, paranoid: true, deletedAt: 'softDelete' }
);

const PRODUCT_MODEL_IMAGES: string = 'product_images';
export const ProductImageModel = sequel.define(
    PRODUCT_MODEL_IMAGES,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { timestamps: true, paranoid: true, deletedAt: 'softDelete' }
);

ProductModel.hasOne(ProductImageModel);
ProductImageModel.belongsTo(ProductModel);

ProductModel.hasMany(DerivedProductModel);
