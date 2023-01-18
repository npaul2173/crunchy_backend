import { DiningRestaurantModel } from 'models/Dining/DiningRestaurants/model';
import { DiningRestaurantCreateProps } from './interface';

class DiningRestaurantService {
    public async create(data: DiningRestaurantCreateProps) {
        try {
            const [response, created] =
                await DiningRestaurantModel.findOrCreate({
                    where: {
                        restaurantName: data.restaurantName,
                    },
                    defaults: data,
                });

            return { created, response };
        } catch (error) {
            throw new Error('❌ Unable to create 🖊️ Dining Restaurant');
        }
    }

    public findAll() {
        try {
            const nodes = DiningRestaurantModel.findAll();
            return nodes;
        } catch (error) {
            throw new Error(
                '❌ Some error occurred while retrieving Dining Restaurant'
            );
        }
    }
}

export default DiningRestaurantService;
