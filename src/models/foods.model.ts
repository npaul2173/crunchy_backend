import { DataTypes } from 'sequelize';
import { sequel } from '.';

const MODEL_NAME: string = 'foods';
export const Foods = sequel.define(
    MODEL_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    }
);
