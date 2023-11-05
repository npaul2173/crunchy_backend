import { CuisinesModel } from 'models/cuisine/model';
import { RestaurantModel } from 'models/food/restaurant/model';
import { restaurantCuisinesModel } from 'models/food/restaurant/restaurantCuisines/model';
import { RestaurantCreateProps } from './interface';

class RestaurantService {
    public async create(data: RestaurantCreateProps) {
        try {
            const restaurantResponse = RestaurantModel.create({
                ...data,
            });

            await restaurantCuisinesModel.create({
                restaurantId: (await restaurantResponse).dataValues.id,
                cuisineId: data.cuisineId,
            });

            return restaurantResponse;
        } catch (error) {
            throw new Error('❌ Unable to create 🖊️ restaurant ');
        }
    }

    public findAll() {
        try {
            const nodes = RestaurantModel.findAll();
            return nodes;
        } catch (error) {
            throw new Error(
                '❌ Some error occurred while retrieving 🖊️ restaurants '
            );
        }
    }

    public delete(id: string) {
        try {
            const nodes = RestaurantModel.destroy({ where: { id } });
            return nodes;
        } catch (error) {
            throw new Error(
                '❌ Some error occurred while removing 🖊️ restaurant '
            );
        }
    }
}

export default RestaurantService;
