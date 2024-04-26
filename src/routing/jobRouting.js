import { Router } from "express";
import * as job from "../controllers/JobController.js";

export const jobRouting = (app) => {
	var router = Router();

	app.use("/job", router);

	router.post("/post/create", job.create);

	router.post("/post/update/:id", job.updateJobByPk);

	router.get("/get/id/:id", job.findJobByPk);

	router.delete("/delete/:id", job.deleteJobByPk);
};
