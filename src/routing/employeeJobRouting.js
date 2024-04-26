import { Router } from "express";
import * as employeeJob from "../controllers/EmployeeJobController.js";

export const employeeJobRouting = (app) => {
	var router = Router();

	app.use("/employeeJob", router);

	// employeeId -> jobId
	router.get("/get/findEmployeeJob/:id", employeeJob.findEmployeesJobId);

	// jobId -> listOfEmployees
	router.get("/get/listEmployeesInJob/:id", employeeJob.listEmployeesInJobId);
};
