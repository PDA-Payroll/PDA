import { DataTypes } from "sequelize";
import { sequelize } from "../dbIndex.js";

export const Leave = sequelize.define("Leave", {
	requestStatus: {
		type: DataTypes.TEXT,
		defaultValue: "Pending",
	},
	// We don't need time because this datatype is both date and time
	LeaveStartDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	LeaveEndDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	leaveType: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});
