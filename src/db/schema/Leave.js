import { DataTypes } from "sequelize";
import { sequelize } from "../dbIndex.js";

export const Leave = sequelize.define("Leave", {
  requestStatus: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  LeaveDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  leaveType: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  leaveTimeStart: {
    type: DataTypes.TIME,
  },
  leaveTimeEnd: {
    type: DataTypes.TIME,
  },
});
