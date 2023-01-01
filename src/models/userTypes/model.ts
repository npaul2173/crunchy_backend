import { DataTypes, Model } from 'sequelize';
import { sequel } from '..';

class UserTypesModel extends Model {}

UserTypesModel.init(
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
        sequelize: sequel,
        timestamps: true,
    }
);

export { UserTypesModel };
