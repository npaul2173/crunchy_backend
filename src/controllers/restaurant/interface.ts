import { RestaurantProps } from 'models/restaurant/interface';

type RestaurantCreateProps = Omit<RestaurantProps, 'id'>;

export { RestaurantCreateProps };
