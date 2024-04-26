import { Job } from "../db/dbIndex.js";
import {
	deleteObjectById,
	findAllOfObject,
	findObjectByPk,
	updateByPk,
} from "../lib/controllerLib.js";

export const create = (req, res) => {
	const job = {
		title: req.body.title,
		baseSalary: req.body.baseSalary,
		leaveAccrualRate: req.body.leaveAccrualRate,
	};
	Job.create(job)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.state(500).send({
				message: err.message || "Error occurred while creating Job",
			});
		});
};

export const findAllJobs = findAllOfObject(Job);
export const findJobByPk = findObjectByPk(Job);
export const updateJobByPk = updateByPk(Job);
export const deleteJobByPk = deleteObjectById(Job);
