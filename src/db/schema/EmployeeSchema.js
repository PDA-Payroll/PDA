import { DataTypes } from "sequelize";
import { sequelize } from "../dbIndex.js";

export const Employee = sequelize.define("Employee", {
	employeeFirstName: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	employeeMiddleName: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	employeeLastName: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	employeeUserName: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	employeePassword: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	socialSecurityNumber: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	supervisorId: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
});
