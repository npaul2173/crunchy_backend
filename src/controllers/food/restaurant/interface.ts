import { RestaurantProps } from 'models/food/restaurant/interface';

type RestaurantCreateProps = Omit<RestaurantProps, 'id'>;

export { RestaurantCreateProps };
