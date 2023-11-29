import { BookingModel } from "../db/booking.ts";
import { ClientModelType } from "../db/client.ts";
import { Client } from "../types.ts";

export const getClientFromModel = async (client: ClientModelType): Promise<Client> => {
    
    const { _id, firstName, lastName, email, phoneNumber, DNI } = client;
    const booking = await BookingModel.find({clientsID: _id});

    if(!booking){
        throw new Error("Booking not found");
    }

    const cliente: Client = {
        id: _id.toString(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        DNI: DNI,
        bookings: booking.map((booking) => ({
            id: booking.id,
            date: booking.date,
            clientID: booking.clientID,
            restaurantID: booking.restaurantID
        }))
    };

    return cliente;
}