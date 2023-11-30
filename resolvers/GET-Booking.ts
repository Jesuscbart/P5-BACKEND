import { Request, Response } from "express";
import { Booking } from "../types.ts";
import { BookingModel, BookingModelType } from "../db/booking.ts";
import { getBookingFromModel } from "../controllers/getBookingFromModel.ts";

export const getBooking = async (req: Request<{ id: string }>,res: Response<Booking | { error: unknown }>) => {
    
    const id = req.params.id;
    try{
        const booking = await BookingModel.findOne({_id: id}).exec();
        if(!booking){
            res.status(404).send({error: "Booking not found"});
            return;
        }

        const bookings: Booking = await getBookingFromModel(booking);

        res.status(200).json(bookings).send();
    }
    catch (error) {
        res.status(500).send(error);
    }
};
