import { DiningRestaurantProps } from 'models/Dining/DiningRestaurants/interface';

type DiningRestaurantCreateProps = Omit<DiningRestaurantProps, 'id'>;

export { DiningRestaurantCreateProps };
