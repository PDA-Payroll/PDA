import { Router } from "express";
import * as billingInfo from "../controllers/BillingInfoController.js";

export const billingInfoRouting = (app) => {
	var router = Router();

	app.use("/billingInfo", router);

	router.post("/post/create", billingInfo.create);

	router.get("/get/:id", billingInfo.findBillingInfoById);
};
