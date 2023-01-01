import { DataTypes, Model } from 'sequelize';
import { sequel } from '..';

class PartnerModel extends Model {}

PartnerModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        userType: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: sequel,
        timestamps: true,
    }
);
