import { DataTypes } from "sequelize";
import { sequelize } from "../server/databaseConnection.js";

export const Employee = sequelize.define("Employee", {
  employeeFirstName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  EmployeeMiddleName: {
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
});

sequelize.models.Employee.hasMany(Employee, {
  foreignKey: "supervisorId",
});
sequelize.models.Employee.belongsTo(Employee);
