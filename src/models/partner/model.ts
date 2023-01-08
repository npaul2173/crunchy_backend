import { DataTypes } from 'sequelize';
import { sequel } from '..';

const MODEL: string = 'partner';

export const PartnerModel = sequel.define(
    MODEL,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        partnerName: {
            type: DataTypes.STRING,
        },
        regMobileNumber: {
            type: DataTypes.STRING,
        },
        secondaryContactNumber: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        isMobileVerified: {
            type: DataTypes.BOOLEAN,
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
        },
        userTypeId: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        deletedAt: 'softDelete',
    }
);
