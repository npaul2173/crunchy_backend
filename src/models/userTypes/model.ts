import { DataTypes, Model } from 'sequelize';
import { sequel } from '..';

const MODEL = 'UserTypes';

export const UserTypeModel = sequel.define(
    MODEL,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        userTypeName: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        deletedAt: 'softDelete',
    }
);
