import { DataTypes } from "sequelize";
import { sequelize } from "../server/index.js";

module.exports = sequelize.define("Leave", {
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
