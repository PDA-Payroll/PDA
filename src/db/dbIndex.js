import { Sequelize, Op } from "sequelize";

import { sequelize } from "../lib/sequelizeUtils.js";
import { BillingInfo } from "./schema/BillingInfoSchema.js";
import { Employee } from "./schema/EmployeeSchema.js";
import { Job } from "./schema/JobSchema.js";
import { Leave } from "./schema/LeaveSchema.js";
import { PunchCard } from "./schema/PunchCardSchema.js";

// setupAssociation Classes
const BillingInfoAssociation = () => {
  BillingInfo.belongsToMany(Employee, { through: "BillingInfoAssociation" });
  Employee.belongsToMany(BillingInfo, { through: "BillingInfoAssociation" });
};

const LeaveRequest = () => {
  Employee.belongsToMany(Leave, { through: "LeaveRequest" });
  Leave.belongsToMany(Employee, { through: "LeaveRequest" });
};

const Promotion = () => {
  Employee.belongsToMany(Job, { through: "Promotion" });
  Job.belongsToMany(Employee, { through: "Promotion" });
};

const setSupvisorRelationship = () => {
  Employee.hasMany(Employee, { foreignKey: "supervisorId" });
  Employee.belongsTo(Employee);
};

const setupAssociation = () => {
  BillingInfoAssociation();
  LeaveRequest();
  Promotion();
  setSupvisorRelationship();
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
