import { CuisinesModel } from 'models/cuisine/model';
import { Op } from 'sequelize';
import { CuisineCreateProps } from './interface';

class CuisineService {
    public async create(data: CuisineCreateProps) {
        try {
            const customerResponse = CuisinesModel.create(data);
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
}

export default CuisineService;
