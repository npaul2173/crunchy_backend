import { DiningRestaurantProps } from 'models/Dining/DiningRestaurants/interface';

type DiningRestaurantCreateProps = Omit<DiningRestaurantProps, 'id'>;

type PopularDishesData = { id: number; popularDishes: string[] };

type DiningRestaurantSearchInputProps = { searchText?: string };
export {
    DiningRestaurantCreateProps,
    PopularDishesData,
    DiningRestaurantSearchInputProps,
};
