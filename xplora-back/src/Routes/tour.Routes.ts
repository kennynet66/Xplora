import { Router } from "express";
import { createTour } from "../Controllers/tours.controller";

const tourRoutes = Router();

tourRoutes.post('/new-tour', createTour);

export default tourRoutes;