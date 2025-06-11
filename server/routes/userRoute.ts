import express from "express";
import { loginController, signUpController } from "../controllers/userController";

const router = express.Router();

router.post("/create-user", signUpController);
router.post("/login",loginController)

export default router;
