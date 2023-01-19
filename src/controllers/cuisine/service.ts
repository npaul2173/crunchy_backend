import { CuisinesModel } from 'models/cuisine/model';
import { Op } from 'sequelize';
import { CuisineCreateProps } from './interface';

class CuisineService {
    public async create(data: CuisineCreateProps) {
        try {
            const [customerResponse, created] =
                await CuisinesModel.findOrCreate({
                    where: {
                        cuisineName: data.cuisineName,
                    },
                    defaults: { ...data },
                });
            return { customerResponse, created };
        } catch (error) {
            throw new Error('❌ Unable to create 🖊️ cuisine ');
        }
    }

    public async createMultiple(data: CuisineCreateProps[]) {
        try {
            const customerResponse = CuisinesModel.bulkCreate(data);
            return customerResponse;
        } catch (error) {
            throw new Error('❌ Unable to create 🖊️ cuisine ');
        }
    }

    public findAll() {
        try {
            const nodes = CuisinesModel.findAll({
                where: { softDelete: { [Op.eq]: null } },
            });
            return nodes;
        } catch (error) {
            throw new Error(
                '❌ Some error occurred while retrieving 🖊️ cuisines '
            );
        }
    }
    public findCuisine(cuisineName: string) {
        try {
            const nodes = CuisinesModel.findOne({
                where: { cuisineName: { [Op.eq]: cuisineName } },
            });
            return nodes;
        } catch (error) {
            throw new Error(
                '❌ Some error occurred while retrieving 🖊️ cuisines '
            );
        }
    }
}

export default CuisineService;
