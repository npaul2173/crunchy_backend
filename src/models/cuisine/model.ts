import { DataTypes } from 'sequelize';
import { sequel } from '..';

const MODEL: string = 'cuisine';

export const CuisinesModel = sequel.define(
    MODEL,
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
