import { Request, Response } from "express";
import { Booking } from "../types.ts";
import { BookingModel, BookingModelType } from "../db/booking.ts";

export const postBooking = async (
    req: Request<{}, {}, BookingModelType>,
    res: Response<Booking | { error: unknown }>
) => {
    try {
        const { date, clientID, restaurantID } = req.body;
        const booking = new BookingModel({
            date,
            clientID,
            restaurantID
        });
        await booking.save();
    
        const 
    }