import { Router } from "express";
import { cancelTour, createTour, deleteTour, getAllTours, getCancelled, restoreTour } from "../Controllers/tours.controller";

const tourRoutes = Router();

tourRoutes.post('/new-tour', createTour);
tourRoutes.get('/all-tours', getAllTours);
tourRoutes.delete('/delete/:id', deleteTour);
tourRoutes.put('/cancel/:id', cancelTour);
tourRoutes.get('/cancelled', getCancelled);
tourRoutes.put('/restore/:id', restoreTour);

export default tourRoutes;