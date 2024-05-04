import { DataTypes, Sequelize, Op } from "sequelize";

import { sequelize } from "../lib/sequelizeUtils.js";
import { BillingInfo } from "./schema/BillingInfoSchema.js";
import { Employee } from "./schema/EmployeeSchema.js";
import { Job } from "./schema/JobSchema.js";
import { Leave } from "./schema/LeaveSchema.js";
import { PunchCard } from "./schema/PunchCardSchema.js";

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

const setSupvisorRelationship = () => {
	Employee.hasMany(Employee, { foreignKey: "supervisorId" });
	Employee.belongsTo(Employee, { foreignKey: "supervisorId" });
};
// associateManyWithEmployee :: model -> modelAssociatedWithEmployee
const associateManyWithEmployee = (model) => {
	Employee.hasMany(
		model,
		{ allowNull: false },
		{
			onDelete: "cascade",
		},
	);
};

// associateBillingInfo :: BillingInfo -> BillingInfoAssociatedWithEmployee
const associateBillingInfoWithEmployee = () =>
	associateManyWithEmployee(BillingInfo);

const associateEmployeeWithBillingInfo = () => {
	BillingInfo.belongsTo(Employee, {
		foreignKey: {
			allowNull: false,
		},
	});
};
// associatePunchCardWithEmployee :: PunchCard -> PunchCardAssociatedWithEmployee
const associatePunchCardWithEmployee = () =>
	associateManyWithEmployee(PunchCard);

const AssociateEmployeeWithPunchCard = () => {
	PunchCard.belongsTo(Employee, {
		foreignKey: {
			allowNull: false,
		},
	});
};

const LeaveRequest = () => {
	Employee.belongsToMany(Leave, { through: "LeaveRequest" });
	Leave.belongsToMany(Employee, { through: "LeaveRequest" });
};

export const AssociateEmployeeJob = () => {
	Employee.belongsToMany(Job, { through: "EmployeeJob" });
	Job.belongsToMany(Employee, { through: "EmployeeJob" });
};

const setupAssociation = () => {
	setSupvisorRelationship();

	associateBillingInfoWithEmployee();
	associateEmployeeWithBillingInfo();

	associatePunchCardWithEmployee();
	AssociateEmployeeWithPunchCard();

	LeaveRequest();
};

export {
	sequelize,
	Sequelize,
	Op,
	BillingInfo,
	Employee,
	Job,
	Leave,
	PunchCard,
	setupAssociation,
};
