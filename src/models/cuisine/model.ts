import { DataTypes } from 'sequelize';
import { sequel } from '..';

export const CUISINE_MODEL: string = 'cuisine';

export const CuisinesModel = sequel.define(
    CUISINE_MODEL,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cuisineName: {
            type: DataTypes.STRING,
        },

        isCuisineVerified: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        deletedAt: 'softDelete',
    }
);
