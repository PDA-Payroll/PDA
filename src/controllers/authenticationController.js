import { Employee, Op } from "../db/dbIndex.js";

export const authenticate = (req, res) => {
	const logIn = {
		employeeUserName: req.body.employeeUserName,
		employeePassword: req.body.employeePassword,
	};
	Employee.findOne({
		where: {
			[Op.and]: [
				{ employeeUserName: logIn.employeeUserName },
				{ employeePassword: logIn.employeePassword },
			],
		},
	})
		.then((data) => {
			if (data.id) {
				res.send({
					status: 200,
					message: "auth success",
					employeeInfo: data,
				});
			} else {
				res.send({
					status: 400,
					message: "incorrect username or password",
				});
			}
		})
		.catch(() => {
			res.send({
				message: "Error!!! Contact the sysadmin for assistance",
			});
		});
};
