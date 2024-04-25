import { Router } from "express";
import * as employee from "../controllers/EmployeeController.js";

export const employeeRouting = (app) => {
	var router = Router();

	router.post("/post/create", employee.create);

	router.post("/post/update/:id", employee.updateEmployeeByPk);

	router.get("/get/:id", employee.findEmployeeByPk);

	router.get("/get/:username", employee.findEmployeeByUsername);

	router.delete("/delete/all", employee.deleteAllEmployees);

	router.delete("/delete/:id", employee.deleteEmployeeById);

	app.use("/employee", router);
};
