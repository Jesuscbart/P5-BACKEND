export type Restaurant = {
    id: string;
    name: string;
    CIF: string;
    address: string;
    bookings: Array<Omit<Booking, "restaurant" | "clients">>;
}

export type Booking = {
    id: string;
    date: Date;
    client: string;
    restaurant: Omit<Restaurant, "bookings">; //Tipo que es y lo que no quiero que tenga
}

export type Client = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    DNI: string;
    bookings: Array<Omit<Booking, "clients" | "restaurant">>;
}
