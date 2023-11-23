import mongoose from "mongoose";
import { Client } from "../types.ts";

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, unique: true },
    DNI: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// validate email - regex = Regular Expression
clientSchema.path("email").validate((email: string) => {
  // letras, números y caracteres seguidos de @ seguido de letras y números seguido de un punto seguido de al menos 2 letras
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
});

// validate phoneNumber - regex = Regular Expression
clientSchema.path("phoneNumber").validate((phoneNumber: string) => {
  // "+" seguido de los números que sean del prefijo del país, seguido de un espacio (opcional) y 9 dígitos
  const regex = /^\+\d+\s?\d{9}$/; 
  return regex.test(phoneNumber);
});

// validate DNI - regex = Regular Expression
clientSchema.path("DNI").validate((DNI: string) => {
  // 8 dígitos seguidos de una letra mayúscula
  const regex = /^\d{8}[A-Z]$/; 
  return regex.test(DNI);
});

export type ClientModelType = mongoose.Document & Omit<Client, "id" | "bookings">;

export const ClientModel = mongoose.model<ClientModelType>(
  "Client",
  clientSchema
);