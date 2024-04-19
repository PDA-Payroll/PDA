import { sequelize } from "../../server/databaseConnection.js";

import { Employee } from "Employee.js";
import { Job } from "Job.js";

export const Promotion = () => {
  sequelize.models.Employee.belongsToMany(Job, { through: "Promotion" });
  sequelize.models.Job.belongsToMany(Employee, { through: "Promotion" });
};
