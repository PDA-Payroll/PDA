import { Op, PunchCard } from "../db/dbIndex.js";
import { deleteAll, updateByPk } from "../lib/controllerLib.js";

export const create = (req, res) => {
	const punchCard = {
		EmployeeId: req.body.employeeId,
		dateIn: req.body.dateIn,
		dateOut: req.body.dateOut,
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

// deleteAllPunchCards :: void -> void
export const deleteAllPunchCards = deleteAll(PunchCard);

// findAllPunchCardsInRange :: dateRange -> hours
export const findAllPunchCardsInRange = (req, res) => {
	const dateRange = {
		startDate: req.params.startDate,
		endDate: req.params.endDate,
	};
	PunchCard.findAll({
		where: {
			dateOut: {
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
