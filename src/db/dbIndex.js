import { Sequelize } from "sequelize";

import * as config from "../constants.js";
import { BillingInfo } from "./schema/BillingInfo.js";
import { BillingInfoAssociation } from "./schema/BillingInfoAssociation.js";
import { Employee, setSupvisorRelationship } from "./schema/Employee.js";
import { Job } from "./schema/Job.js";
import { Leave } from "./schema/Leave.js";
import { LeaveRequest } from "./schema/LeaveRequest.js";
import { Promotion } from "./schema/Promotion.js";
import { PunchCard } from "./schema/PunchCard.js";

//database connection
export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "postgres",
  },
);

// Database Schema
export const setAssociations = () => {
  BillingInfoAssociation();
  LeaveRequest();
  setSupvisorRelationship();
  Promotion();
};
export { BillingInfo, Employee, Job, Leave, PunchCard };
