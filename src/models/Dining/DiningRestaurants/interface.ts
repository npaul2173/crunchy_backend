interface DiningRestaurantProps {
    id: String;
    restaurantName: string;
    photos: string[];
    street: string;
    landmark: string;
    state: string;
    city: string;
    pincode: string;
    menu?: string;
    contactNumber: string;
    alternateContact?: string;
    popularDishes?: string[];
    features?: string;
    pocketPinch?: number;
}

export { DiningRestaurantProps };
