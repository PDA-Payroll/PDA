import { DataTypes } from "sequelize";
import { sequelize } from "../../server/databaseConnection.js";

export const PunchCard = sequelize.define(
  "PunchCard",
  {
    clockInTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clockOutTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
