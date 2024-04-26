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
			if (data.length === 0) {
				res.send({
					message:
						"Incorrect Username or Password.  Please try again or contact the sysadmin",
				});
			} else {
				res.send(data);
			}
		})
		.catch(() => {
			res.send({
				message: "Error!!! Contact the sysadmin for assistance",
			});
		});
};
