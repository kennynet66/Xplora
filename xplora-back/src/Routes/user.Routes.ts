import { Router } from "express";
import { createUser } from "../Controllers/signup.controller";
import { loginUser } from "../Controllers/login.controller";

const userRoutes = Router();

userRoutes.post('/signup', createUser);
userRoutes.post('/login', loginUser);

export default userRoutes;