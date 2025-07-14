import express from "express";
import { loginUser,registerUser } from "../controllers/usercontroller.js";

const userRouter = express.Router();
// Route for user login
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);

export default userRouter;