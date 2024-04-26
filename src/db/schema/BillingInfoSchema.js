import { DataTypes } from "sequelize";
import { sequelize } from "../dbIndex.js";

export const BillingInfo = sequelize.define("BillingInfo", {
	addressLine1: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	addressLine2: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	city: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	postalCode: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	state: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	routingNumber: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});
