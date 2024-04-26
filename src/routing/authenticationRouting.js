import { Router } from "express";
import { authenticate } from "../controllers/authenticationController.js";

export const authenticationRouting = (app) => {
	var router = Router();

	app.use("/auth", router);

	router.post("/login", authenticate);
};
