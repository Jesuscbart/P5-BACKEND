import mongoose from "mongoose";
import {Request, Response} from "express";                     
import {ClientModel, ClientModelType} from "../db/client.ts";
import { Client } from "../types.ts";


export const postClient = async (

  req: Request<{}, {}, ClientModelType>,
  res: Response<Client | { error: unknown }>
) => {
  try {

    const {firstName, lastName, email, phoneNumber, DNI, bookingsID} = req.body;
    const client = new ClientModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      DNI,
      bookingsID
    });

    await client.save();

    const bookings = bookingsID?.map((booking)=> {
      const d
    }
    
    
    )


}
}