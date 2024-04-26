import { EmployeeJob } from "../db/dbIndex.js";

export const create = (req, res) => {
	const employeeJob = {
		EmployeeId: req.body.employeeId,
		JobId: req.body.JobId,
	};
	EmployeeJob.create(employeeJob)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.state(500).send({
				message:
					err.message || "Error occurred while assigning Employee to Job",
			});
		});
};

export const findEmployeesJobId = (req, res) => {
	const id = req.params.employeeId;
	EmployeeJob.findOne({
		where: { EmployeeId: id },
		order: [["createdAt", "DESC"]],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "An error occurred while looking for EmployeeJob",
			});
		});
};

export const listEmployeesInJobId = (req, res) => {
	const id = req.params.jobId;
	EmployeeJob.findAll({
		where: { JobId: id },
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "An error occurred while looking for EmployeeJob",
			});
		});
};
