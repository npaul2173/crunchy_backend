import { DataTypes, Model } from 'sequelize';
import { sequel } from '..';

const MODEL = 'Role';

export const RoleModel = sequel.define(
    MODEL,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        roleName: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        deletedAt: 'softDelete',
    }
);
