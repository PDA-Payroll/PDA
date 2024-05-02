import * as db from "../db/dbIndex.js";
import {
	deleteAll,
	deleteObjectById,
	findObjectByPk,
	updateByPk,
} from "../lib/controllerLib.js";

const Employee = db.Employee;
const Op = db.Op;

export const create = (req, res) => {
	const employee = {
		employeeFirstName: req.body.employeeFirstName,
		employeeMiddleName: req.body.employeeMiddleName,
		employeeLastName: req.body.employeeMiddleName,
		employeeUserName: req.body.employeeUserName,
		employeePassword: req.body.employeePassword,
		isAdmin: req.body.isAdmin,
		isSupervisor: req.body.isSupervisor,
		socialSecurityNumber: req.body.socialSecurityNumber,
		supervisorId: req.body.supervisorId,
	};
	Employee.create(employee)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error occurred while creating Employee",
			});
		});
};

export const updateEmployeeByPk = updateByPk(Employee);

export const findEmployeeByPk = findObjectByPk(Employee);

export const findEmployeeByUsername = (req, res) => {
	const username = req.params.employeeUserName;
	var condition = username
		? { username: { [Op.like]: `%${username}%` } }
		: null;

	Employee.findOne({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "An error occurred while searching username",
			});
		});
};

export const deleteEmployeeById = deleteObjectById(Employee);

export const deleteAllEmployees = deleteAll(Employee);
