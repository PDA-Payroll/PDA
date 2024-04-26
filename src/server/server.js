import express from "express";
import cors from "cors";

import { PORT } from "../constants.js";

import * as db from "../db/dbIndex.js";
import * as errorCodes from "./errorCodes.js";
import { initDbConnection } from "../lib/sequelizeUtils.js";
import { employeeRouting } from "../routing/employeeRouting.js";
import { billingInfoRouting } from "../routing/billingInfoRouting.js";
import { authenticationRouting } from "../routing/authenticationRouting.js";
import { employeeJobRouting } from "../routing/employeeJobRouting.js";
import { jobRouting } from "../routing/jobRouting.js";
import { leaveRouting } from "../routing/leaveRouting.js";
import { punchCardRouting } from "../routing/punchCardRouting.js";

const app = express();

try {
	await db.sequelize.authenticate();
	console.log("Successfully Connected to Database");
} catch (error) {
	console.error(
		"Failed to connect to Database, trying again in 5 seconds",
		error,
	);
}
initDbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(errorCodes.error418);
});

authenticationRouting(app);
billingInfoRouting(app);
employeeRouting(app);
employeeJobRouting(app);
jobRouting(app);
leaveRouting(app);
punchCardRouting(app);

app.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});
