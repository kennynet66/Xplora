import { Router } from "express";
import { bookTour, getUserBookings } from "../Controllers/booking.controller";

const bookingRoutes = Router()
// Create the booking routes
bookingRoutes.post('/book/:user_id', bookTour);
bookingRoutes.get('/booked-tours/:user_id', getUserBookings);

export default bookingRoutes