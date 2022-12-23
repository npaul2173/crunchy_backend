import { DataTypes } from 'sequelize';
import { sequel } from '..';

const MODEL_NAME: string = 'customer';
export const CustomerModel = sequel.define(
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
        phone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        isPhoneVerified: {
            type: DataTypes.BOOLEAN,
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: true,
    }
);
