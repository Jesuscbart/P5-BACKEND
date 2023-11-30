import { Request, Response } from "express";
import { Restaurant } from "../types.ts";
import { RestaurantModel, RestaurantModelType } from "../db/restaurant.ts";
import { getRestaurantFromModel } from "../controllers/getRestaurantFromModel.ts";

export const getRestaurant = async (req: Request<{ id: string }>,res: Response<Restaurant | { error: unknown }>) => {
    
    const id = req.params.id;
    try{
        const restaurant = await RestaurantModel.findOne({_id: id}).exec();
        if(!restaurant){
            res.status(404).send({error: "Restaurant not found"});
            return;
        }

        const restaurants: Restaurant = await getRestaurantFromModel(restaurant);

        res.status(200).json(restaurants).send();
    }
    catch (error) {
        res.status(500).send(error);
    }
};
