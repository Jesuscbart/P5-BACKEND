import {Request, Response} from "express";                     
import {RestaurantModel, RestaurantModelType} from "../db/restaurant.ts";
import { Restaurant } from "../types.ts";
import { Booking } from "../types.ts";
import { getRestaurantFromModel } from "../controllers/getRestaurantFromModel.ts";
import { BookingModel } from "../db/booking.ts";


export const postRestaurant = async (req: Request<undefined, undefined, RestaurantModelType>,res: Response<Restaurant | { error: unknown }>) => {
  
  try {

    const {name, CIF, address, bookingsID } = req.body;

    const restaurant = new RestaurantModel({name,CIF,address});
    await restaurant.save();

    const bookings = bookingsID?.map((booking: Omit<Booking, 'id' | 'restaurantID'>) => {
      const { date, clientID } = booking;
      const reserva = new BookingModel({ date, clientID, restaurantID: restaurant._id });
      return reserva.save();
    });

    if (bookings) {
      await Promise.all(bookings);
    }

    const restaurants: Restaurant = await getRestaurantFromModel(restaurant);

    res.status(201).json(restaurants);
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
};