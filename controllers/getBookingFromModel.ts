import { BookingModelType } from "../db/booking.ts";
import { ClientModel } from "../db/client.ts";
import { RestaurantModel } from "../db/restaurant.ts";
import { Booking } from "../types.ts";

export const getBookingFromModel = async (booking: BookingModelType): Promise<Booking> => {
    
    const { _id, date, clientID, restaurantID } = booking;

    const client = await ClientModel.findById(clientID).exec();

    if(!client){
        throw new Error("Client not found");
    }

    const restaurant = await RestaurantModel.findById(restaurantID).exec();

    if(!restaurant){
        throw new Error("Restaurant not found");
    }

    const reserva: Booking = {
        id: _id.toString(),
        date: date,
        clientID: clientID,
        restaurantID: restaurantID,
    };

    return reserva;
}