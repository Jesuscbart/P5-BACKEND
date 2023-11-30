// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { RestaurantModel } from "../db/restaurant.ts";

export const deleteAllRestaurants = async (_req: Request,res: Response<string | { error: unknown }>) => {
    
    try{

        const restaurant = await RestaurantModel.deleteMany({}).exec();
        if (!restaurant) {
            res.status(404).send({ error: "Restaurant not found" });
            return;
          }
         res.status(200).send("All restaurants deleted");
    }
    catch (error) {
        res.status(500).send(error);
    }  
}