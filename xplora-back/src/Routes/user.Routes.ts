import { Router } from "express";
import { createUser } from "../Controllers/signup.controller";
import { loginUser } from "../Controllers/login.controller";
import { activateUser, deactivateUser, deleteUser, getUsers, oneUser } from "../Controllers/user.controller";

const userRoutes = Router();

// Route to get all users
userRoutes.get('/users', getUsers);
// Route to get a single user by id
userRoutes.get('/:id', oneUser);
// Route to register/signup a new user
userRoutes.post('/signup', createUser);
// Route to login an existing user
userRoutes.post('/login', loginUser);
// Route to deactivate an existing user account
userRoutes.put('/deactivate/:id', deactivateUser);
// Route to activate a deactivated user
userRoutes.put('/activate/:id', activateUser);
// Route to delete a single user by id
userRoutes.delete('/delete/:id', deleteUser);

export default userRoutes;