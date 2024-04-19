import { DataTypes } from "sequelize";
import { sequelize } from "../dbIndex.js";

export const Job = sequelize.define("Job", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hoursScheduled: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  baseSalary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  leaveAccrualRate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
