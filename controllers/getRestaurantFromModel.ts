import { BookingModel } from "../db/booking.ts";
import { RestaurantModelType } from "../db/restaurant.ts";
import { Restaurant } from "../types.ts";

export const getRestaurantFromModel = async (restaurant: RestaurantModelType): Promise<Restaurant> => {
    
    const { _id, name, CIF, address} = restaurant;
    const booking = await BookingModel.find({restaurantID: _id});

    if(!booking){
        throw new Error("Booking not found");
    }

    const restaurante: Restaurant = {
        id: _id.toString(),
        name: name,
        CIF: CIF,
        address: address,
        bookings: booking.map((booking) => ({
            id: booking.id,
            date: booking.date,
            clientID: booking.clientID,
            restaurantID: booking.restaurantID
        }))
    };

    return restaurante;
}