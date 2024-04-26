import { DataTypes } from "sequelize";
import { Employee, Job, sequelize } from "../dbIndex";

export const EmployeeJob = sequelize.define("EmployeeJob", {
	EmployeeId: {
		type: DataTypes.INTEGER,
		references: {
			mode: Employee,
			key: "id",
		},
	},
	JobId: {
		type: DataTypes.INTEGER,
		references: {
			model: Job,
			key: "id",
		},
	},
});

export const AssociateEmployeeJob = () => {
	Employee.belongsToMany(Job, { through: "EmployeeJob" });
	Job.belongsToMany(Employee, { through: "EmployeeJob" });
};
