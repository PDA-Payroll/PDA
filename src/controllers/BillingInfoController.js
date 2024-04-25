import { BillingInfo } from "../db/dbIndex";

export const create = (req, res) => {
	const billingInfo = {
		employeeId: req.body.employeeId,
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
