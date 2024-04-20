import { Router } from "express";
import * as employee from "../controllers/EmployeeController.js";

export const employeeRouting = (app) => {
  var router = Router();

  //create a new emplotee
  router.post("/post", employee.create);

  // find employee by pk
  router.get("/get/:id", employee.findEmployeeByPk);

  router.delete("/delete/all", employee.deleteAllEmployees);

  router.delete("/delete/:id", employee.deleteEmployeeById);

  app.use("/employee", router);
};
