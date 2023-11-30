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
/*
// validate restaurantID 
bookingSchema.path("restaurantID").validate(async (restaurantID: mongoose.Types.ObjectId) => {
    const restaurant = await RestaurantModel.findById(restaurantID).exec();
    if (!restaurant) return false;
    return true;
});

// validate clientID
bookingSchema.path("clientID").validate(async (clientIDs: mongoose.Types.ObjectId[]) => {
        const clients = await ClientModel.find({ _id: { $in: clientIDs } }).exec();
        if (clientIDs.length !== clients.length) return false;
        return true;
});
*/
export type BookingModelType = mongoose.Document &
    Omit<Booking, "id" | "restaurant" | "clients"> & 
    {
        restaurantID: mongoose.Types.ObjectId;
        clientsID: mongoose.Types.ObjectId;
    };

// Middleware que se ejecuta después de que una reserva es eliminada
bookingSchema.post('deleteOne', { document: true, query: false }, async function() {
    const booking = this;
    try {
      // Eliminar la referencia de la reserva en el cliente
      await ClientModel.updateOne(
        { _id: booking.clientID },
        { $pull: { bookings: booking._id } }
      );
  
      // Eliminar la referencia de la reserva en el restaurante
      await RestaurantModel.updateOne(
        { _id: booking.restaurantID },
        { $pull: { bookings: booking._id } }
      );
    } catch (error) {
      console.error("Error al actualizar las colecciones de clientes y restaurantes: ", error);
    }
});

// Middleware que se ejecuta después de que una reserva es creada
bookingSchema.post('save', async function(doc) {
    try {
      await ClientModel.findByIdAndUpdate(doc.clientID, { $addToSet: { bookings: doc._id } });
      await RestaurantModel.findByIdAndUpdate(doc.restaurantID, { $addToSet: { bookings: doc._id } });
    } catch (error) {
      console.error('Error al actualizar cliente y restaurante:', error);
    }
  });


export const BookingModel = mongoose.model<BookingModelType>("Booking", bookingSchema);