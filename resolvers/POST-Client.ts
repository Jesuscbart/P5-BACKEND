import {Request, Response} from "express";                     
import {ClientModel, ClientModelType} from "../db/client.ts";
import { Client } from "../types.ts";
import { Booking } from "../types.ts";
import { getClientFromModel } from "../controllers/getClientFromModel.ts";
import { BookingModel } from "../db/booking.ts";


export const postClient = async (req: Request<undefined, undefined, ClientModelType>,res: Response<Client | { error: unknown }>) => {
  
  try {

    const {firstName, lastName, email, phoneNumber, DNI, bookingsID} = req.body;

    const client = new ClientModel({firstName,lastName,email,phoneNumber,DNI,bookingsID});

    await client.save();

    const bookings = bookingsID?.map((booking: Omit<Booking, 'id' | 'clientID'>)=> {
      const {date, restaurantID} = booking;
      const reserva = new BookingModel({date, restaurantID, clientID: client._id});
      reserva.save();
    });

    if (bookings) {
      await Promise.all(bookings);
    }

    const clients: Client = await getClientFromModel(client);

    res.status(201).json(clients);
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
};