import { sequelize } from "./sequelize.js";
import { BillingInfo } from "./schema/BillingInfo.js";
import { Employee } from "./schema/Employee.js";
import { Job } from "./schema/Job.js";
import { Leave } from "./schema/Leave.js";
import { PunchCard } from "./schema/PunchCard.js";

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
  BillingInfo,
  Employee,
  Job,
  Leave,
  PunchCard,
  setupAssociation,
};
