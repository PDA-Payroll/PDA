import { Sequelize, Op } from "sequelize";

import { sequelize } from "../lib/sequelizeUtils.js";
import { BillingInfo } from "./schema/BillingInfoSchema.js";
import { Employee } from "./schema/EmployeeSchema.js";
import { Job } from "./schema/JobSchema.js";
import { Leave } from "./schema/LeaveSchema.js";
import { PunchCard } from "./schema/PunchCardSchema.js";

// associ

const setSupvisorRelationship = () => {
	Employee.hasMany(Employee, { foreignKey: "supervisorId" });
	Employee.belongsTo(Employee);
};
// associateManyWithEmployee :: model -> modelAssociatedWithEmployee
const associateManyWithEmployee = (model) => {
	Employee.hasMany(model, {
		onDelete: "cascade",
	});
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

const Promotion = () => {
	Employee.belongsToMany(Job, { through: "Promotion" });
	Job.belongsToMany(Employee, { through: "Promotion" });
};

const setupAssociation = () => {
	setSupvisorRelationship();

	associateBillingInfoWithEmployee();
	associateEmployeeWithBillingInfo();

	associatePunchCardWithEmployee();
	AssociateEmployeeWithPunchCard();

	LeaveRequest();
	Promotion();
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
