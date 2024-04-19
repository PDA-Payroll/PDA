import { BillingInfo } from "./schema/BillingInfo.js";
import { BillingInfoAssociation } from "./schema/BillingInfoAssociation.js";
import { Employee, setSupvisorRelationship } from "./schema/Employee.js";
import { Job } from "./schema/Job.js";
import { Leave } from "./schema/Leave.js";
import { LeaveRequest } from "./schema/LeaveRequest.js";
import { Promotion } from "./schema/Promotion.js";
import { PunchCard } from "./schema/PunchCard.js";

setAssociations = () => {
  BillingInfoAssociation();
  LeaveRequest();
  setSupvisorRelationship();
  Promotion();
};
module.exports = {
  BillingInfo,
  Employee,
  Job,
  Leave,
  PunchCard,
  setAssociations,
};
