import { sequelize } from "../server/databaseConnection.js";

import { Employee } from "Employee.js";
import { BillingInfo } from "BillingInfo.js";

sequelize.models.Employee.belongsToMany(BillingInfo, {
  through: "BillingInfoAssociation",
});
sequelize.models.Job.belongsToMany(Employee, {
  through: "BillingInfoAssociation",
});
