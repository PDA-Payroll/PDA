import { Router } from "express";
import * as PunchCard from "../controllers/PunchCardController.js";

export const punchCardRouting = (app) => {
	var router = Router();

	app.use("/punchCard", router);

	router.post("/post/create", PunchCard.create);
};
