import { Router } from "express";
import { createUser } from "../Controllers/signup.controller";
import { loginUser } from "../Controllers/login.controller";
import { activateUser, deactivateUser, deleteUser, getUsers, oneUser } from "../Controllers/user.controller";
import { requireAdmin } from "../Middleware/auth.middleware";

const userRoutes = Router();

// Route to get all users
userRoutes.get('/users', requireAdmin, getUsers);
// Route to get a single user by id
userRoutes.get('/:id', requireAdmin, oneUser);
// Route to register/signup a new user
userRoutes.post('/signup', createUser);
// Route to login an existing user
userRoutes.post('/login', loginUser);
// Route to deactivate an existing user account
userRoutes.put('/deactivate/:id', requireAdmin,  deactivateUser);
// Route to activate a deactivated user
userRoutes.put('/activate/:id', requireAdmin,  activateUser);
// Route to delete a single user by id
userRoutes.delete('/delete/:id', requireAdmin,  deleteUser);

export default userRoutes;