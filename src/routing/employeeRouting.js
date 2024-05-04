import { Router } from "express";
import * as employee from "../controllers/EmployeeController.js";

export const employeeRouting = (app) => {
	var router = Router();

	app.use("/employee", router);

	router.post("/post/create", employee.create);

	router.post("/post/update/:id", employee.updateEmployeeByPk);

	router.get("/get/id/:id", employee.findEmployeeByPk);

	router.get("/get/username/:username", employee.findEmployeeByUsername);

	router.get(
		"/get/supervisor/:supervisoriD",
		employee.findEmployeesBySupervisorId,
	);

	router.delete("/delete/all", employee.deleteAllEmployees);

	router.delete("/delete/:id", employee.deleteEmployeeById);
};
