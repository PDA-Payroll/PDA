import { BillingInfo, Op } from "../db/dbIndex.js";

export const create = (req, res) => {
	const billingInfo = {
		EmployeeId: req.body.employeeId,
		addressLine1: req.body.addressLine1,
		addressLine2: req.body.addressLine2,
		city: req.body.city,
		postalCode: req.body.postalCode,
		state: req.body.state,
		routingNumber: req.body.routingNumber,
	};
	BillingInfo.create(billingInfo)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.state(500).send({
				message: err.message || "Error occurred while creating BillingInfo",
			});
		});
};

export const findBillingInfoById = (req, res) => {
	const id = req.params.id;
	BillingInfo.findOne({
		where: { EmployeeId: id },
		order: [["createdAt", "DESC"]],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "An error while looking for billing info",
			});
		});
};
