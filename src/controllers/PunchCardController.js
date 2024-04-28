import { Op, PunchCard } from "../db/dbIndex.js";
import { updateByPk } from "../lib/controllerLib.js";

export const create = (req, res) => {
	const punchCard = {
		EmployeeId: req.body.employeeId,
		date: req.body.date,
		timeWorked: req.body.timeWorked,
	};
	PunchCard.create(punchCard)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.state(500).send({
				message: err.message || "Error occurred while creating PunchCard",
			});
		});
};

export const updatePunchCard = updateByPk(PunchCard);

export const findPunchCardByDate = (req, res) => {
	const date = req.params.date;

	PunchCard.findAll({
		where: {
			date: date,
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.state(500).send({
				message: err.message || "Error occurred while finding punchard",
			});
		});
};

// findTotalNumberHoursWorked :: dateRange -> hours
export const findTotalNumberHoursWorked = (req, res) => {
	const dateRange = {
		startDate: req.body.startDate,
		endDate: req.body.endDate,
	};
	PunchCard.sum({
		where: {
			date: {
				[Op.between]: [dateRange.startDate, dateRange.endDate],
			},
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.state(500).send({
				message: err.message || "Error occurred while searching date range",
			});
		});
};
