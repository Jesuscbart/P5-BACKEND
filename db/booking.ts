import mongoose from "mongoose";
import { RestaurantModel } from "./restaurant.ts";
import { ClientModel } from "./client.ts";
import { Booking } from "../types.ts";

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    date: { type: Date, optional: true },
    clientID: { type: Schema.Types.ObjectId, ref: "Client" },
    restaurantID: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  },
  { timestamps: true }
);

// validate restaurantID 
bookingSchema.path("restaurantID").validate(async (restaurantID: mongoose.Types.ObjectId) => {
    const restaurant = await RestaurantModel.findById(restaurantID).exec();
    if (!restaurant) return false;
    return true;
});

// validate clientID
bookingSchema.path("clientID").validate(async (clientIDs: mongoose.Types.ObjectId[]) => {
    try{
        const clients = await ClientModel.find({ _id: { $in: clientIDs } }).exec();
        if (clientIDs.length !== clients.length) return false;
        return true;
    }
    catch (e){
        return false;
    }
});

export type BookingModelType = mongoose.Document &
    Omit<Booking, "id" | "restaurant" | "clients"> & 
    {
        restaurantID: mongoose.Types.ObjectId;
        clientsID: mongoose.Types.ObjectId;
    };

export const BookingModel = mongoose.model<BookingModelType>("Booking", bookingSchema);