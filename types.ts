export type Restaurant = {
    id: string;
    name: string;
    CIF: string;
    address: string;
    bookings: Array<Omit<Booking, "restaurant" | "client">>;
}

export type Booking = {
    id: string;
    date: Date;
    clientID: Omit<Client, "bookings">;
    restaurantID: Omit<Restaurant, "bookings">; //Tipo que es y lo que no quiero que tenga
}

export type Client = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    DNI: string;
    bookings: Array<Omit<Booking, "client" | "restaurant">>;
}
