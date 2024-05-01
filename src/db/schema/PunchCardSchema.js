import { DataTypes } from "sequelize";
import { sequelize } from "../dbIndex.js";

export const PunchCard = sequelize.define("PunchCard", {
	// This is in hours
	dateIn: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	dateOut: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	timeWorked: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	approvalStatus: {
		type: DataTypes.STRING,
		defaultValue: "pending",
	},
});
