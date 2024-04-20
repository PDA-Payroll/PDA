import express from "express";
import cors from "cors";

import { PORT } from "../constants.js";

import * as db from "../db/dbIndex.js";
import * as errorCodes from "./errorCodes.js";
import { initDbConnection } from "../lib/sequelizeUtils.js";

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

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
