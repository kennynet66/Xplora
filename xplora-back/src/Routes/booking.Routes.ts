import { Router } from "express";
import { bookTour } from "../Controllers/booking.controller";

const bookingRoutes = Router()
// Create the booking routes
bookingRoutes.post('/book/:user_id', bookTour);

export default bookingRoutes