import express from "express";
import {
  loginController,
  logoutController,
  registerController
} from "../controllers/authController";

// route object
const router = express.Router();

// routes
router.post("/register", registerController); // Register

router.post("/login", loginController); //Login

router.post("/logout", logoutController); //Logout

export default router;
