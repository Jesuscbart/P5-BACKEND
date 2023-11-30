import mongoose from "mongoose";
import { Restaurant } from "../types.ts";

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    CIF: { type: String, required: true, unique: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

// validate CIF -- regex = Regular Expression
restaurantSchema.path("CIF").validate((CIF: string) => {
  // El CIF/NIF de una empresa se caracteriza por llevar, en primer lugar, una letra, a continuación, 8 números,
  const regex = /^[A-Z]\d{8}$/;
  return regex.test(CIF);
});

export type RestaurantModelType = mongoose.Document & Omit<Restaurant, "id" | "bookings">;

export const RestaurantModel = mongoose.model<RestaurantModelType>(
  "Restaurant",
  restaurantSchema
);