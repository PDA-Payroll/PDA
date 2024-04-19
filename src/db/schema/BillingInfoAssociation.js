import { sequelize } from "../../server/databaseConnection.js";

import { Employee } from "Employee.js";
import { BillingInfo } from "BillingInfo.js";

export const BillingInfoAssociation = () => {
  sequelize.models.Employee.belongsToMany(Employee, {
    through: "BillingInfoAssociation",
  });
  sequelize.models.Leave.belongsToMany(BillingInfo, {
    through: "BillingInfoAssociation",
  });
};
