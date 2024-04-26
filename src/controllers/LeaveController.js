import { Leave } from "../db/dbIndex.js";

export const create = (req, res) => {
	const leave = {
		EmployeeId: req.body.employeeId,
		requestStatus: req.body.requestStatus,
		leaveStartDate: req.body.leaveStartDate,
		leaveEndDate: req.body.leaveEndDate,
		leaveType: req.body.leaveType,
	};
	Leave.create(leave)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.state(500).send({
				message: err.message || "Error occurred while creating leave",
			});
		});
};
