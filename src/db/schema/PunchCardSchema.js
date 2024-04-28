import { DataTypes } from "sequelize";
import { sequelize } from "../dbIndex.js";

export const PunchCard = sequelize.define("PunchCard", {
	// This is in hours
	date: {
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
