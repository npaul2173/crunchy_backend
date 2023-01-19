import { sequel } from 'models/index';
import { ProductModel } from 'models/product/model';
import { DataTypes } from 'sequelize';

const MODEL_NAME: string = 'diningImages';

const DiningImagesModel = sequel.define(
    MODEL_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        photo: { type: DataTypes.STRING },
    },
    {
        timestamps: true,
    }
);
export { DiningImagesModel };
