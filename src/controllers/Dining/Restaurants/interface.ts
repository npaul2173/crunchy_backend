import { DiningRestaurantProps } from 'models/dining/DiningRestaurants/interface';

type DiningRestaurantCreateProps = Omit<DiningRestaurantProps, 'id'>;

type PopularDishesData = { id: number; popularDishes: string[] };

type DiningRestaurantSearchInputProps = { searchText?: string };
export {
    DiningRestaurantCreateProps,
    PopularDishesData,
    DiningRestaurantSearchInputProps,
};
