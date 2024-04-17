import { DataTypes } from "sequelize";
import { sequelize } from "../server/databaseConnection.js";

module.exports = sequelize.define("BillingInfo", {
  id: {
    type: DataTypes.UUID,
    autoIncrement: true,
    primaryKey: true,
  },
  addressLine1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  addressLine2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  city: {
    type: DataTypes.TEXT,
  },
  postalCode: {
    type: DataTypes.INTEGER,
  },
  state: {
    type: DataTypes.TEXT,
  },
});
