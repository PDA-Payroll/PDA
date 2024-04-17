import { sequelize } from "../server/databaseConnection.js";

import { Employee } from "Employee.js";
import { Leave } from "Leave.js";

sequelize.models.Employee.belongsToMany(Leave, {
  through: "LeaveRequest",
});
sequelize.models.Leave.belongsToMany(Employee, {
  through: "LeaveRequest",
});
