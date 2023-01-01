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
    },
    {
        sequelize: sequel,
        timestamps: true,
    }
);
