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

// validate CIF -- ARREGLAR
restaurantSchema.path("CIF").validate(async (CIF: mongoose.Types.ObjectId) => {
  const restaurant = await RestaurantModel.findById(CIF).exec();
  if (!restaurant) return false;
  return true;
});

export type RestaurantModelType = mongoose.Document & Omit<Restaurant, "id" | "bookings">;

export const RestaurantModel = mongoose.model<RestaurantModelType>(
  "Restaurant",
  restaurantSchema
);