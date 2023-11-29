import {Request, Response} from "express";                     
import {RestaurantModel, RestaurantModelType} from "../db/restaurant.ts";
import { Restaurant } from "../types.ts";
import { getRestaurantFromModel } from "../controllers/getRestaurantFromModel.ts";
import { BookingModel } from "../db/booking.ts";


export const postRestaurant = async (req: Request<{}, {}, RestaurantModelType>,res: Response<Restaurant | { error: unknown }>) => {
  
  try {

    const {name, CIF, address, bookingsID } = req.body;

    const restaurant = new RestaurantModel({name,CIF,address});
    await restaurant.save();

    const bookings = bookingsID?.map((booking)=> {
      const {date, clientID} = booking;
      const reserva = new BookingModel({date, clientID, restaurantID: restaurant._id});
      reserva.save();
    });

    await Promise.all(bookings);

    const restaurants: Restaurant = await getRestaurantFromModel(restaurant);

    res.json(restaurants);
  }
  catch(error){
    res.status(500).send(error);
  }
};