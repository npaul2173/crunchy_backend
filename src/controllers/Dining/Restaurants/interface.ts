import { DiningRestaurantProps } from 'models/Dining/DiningRestaurants/interface';

type DiningRestaurantCreateProps = Omit<DiningRestaurantProps, 'id'>;

type PopularDishesData = { id: number; popularDishes: string[] };
export { DiningRestaurantCreateProps, PopularDishesData };
