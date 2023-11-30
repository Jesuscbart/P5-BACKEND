// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { BookingModel } from "../db/booking.ts";

export const deleteBooking = async (req: Request<{ id: string }>,res: Response<string | { error: unknown }>) => {
    const id = req.params.id;
    
    try{

        const booking = await BookingModel.findByIdAndDelete(id).exec();
        if (!booking) {
            res.status(404).send({ error: "Booking not found" });
            return;
          }
         res.status(200).send("Booking deleted");
    }
    catch (error) {
        res.status(500).send(error);
    }  
}