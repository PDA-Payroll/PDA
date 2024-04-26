import { Router } from "express";
import * as LeaveController from "../controllers/LeaveController.js";

export const leaveRouting = (app) => {
	var router = Router();

	app.use("/leave", router);

	router.post("/post/create", LeaveController.create);
};
