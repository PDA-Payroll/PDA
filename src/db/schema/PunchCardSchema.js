import { DataTypes } from "sequelize";
import { sequelize } from "../dbIndex.js";

export const PunchCard = sequelize.define("PunchCard", {
	// This is in hours
	date: DataTypes.DATE,
	timeWorked: DataTypes.FLOAT,
});
