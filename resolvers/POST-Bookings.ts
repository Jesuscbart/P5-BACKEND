import { Request, Response } from "express";
import { Booking } from "../types.ts";
import { BookingModel, BookingModelType } from "../db/booking.ts";
import { getBookingFromModel } from "../controllers/getBookingFromModel.ts";

export const postBooking = async (req: Request<undefined, undefined, BookingModelType>,res: Response<Booking | { error: unknown }>) => {
    try {
        const { date, clientID, restaurantID } = req.body;

        const booking = new BookingModel({date,clientID,restaurantID});
        await booking.save();

        const bookings: Booking = await getBookingFromModel(booking);

        res.status(201).json(bookings);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
};