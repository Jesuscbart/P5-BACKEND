// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import mongoose from "mongoose";
import express from "express";                  
import { postClient } from "./resolvers/POST-Client.ts";
import { postRestaurant } from "./resolvers/POST-Restaurant.ts";
import { postBooking } from "./resolvers/POST-Bookings.ts";
import { getClient } from "./resolvers/GET-Client.ts";
import { getRestaurant } from "./resolvers/GET-Restaurant.ts";
import { getBooking } from "./resolvers/GET-Booking.ts";

try{

    const MONGO_URL = Deno.env.get("MONGO_URL");
  
    if (!MONGO_URL) {
      console.log("No mongo URL found");
      Deno.exit(1);
    }
  
    await mongoose.connect(MONGO_URL);
    console.info("Successfully connected to MongoDB");
  
    const app = express();
    app.use(express.json());

    app

    .get("/", (_req: Request, res: Response) => { res.send("API ready to use") })                            //Ruta inicial por defecto

    .post("/client", postClient)
    .post("/restaurant", postRestaurant)
    .post("/booking", postBooking)
    .get("/client/:id", getClient)
    .get("/restaurant/:id", getRestaurant)
    .get("/booking/:id", getBooking)



    app.listen(3000, () => console.info("Listening on port 3000. API ready to use"));   //Escucho en el puerto 3000
  
    
  }
  catch(e){
    console.error(e);
  }   
  
  

















