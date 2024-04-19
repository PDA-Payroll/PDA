import express from "express";
import cors from "cors";

import { PORT } from "../constants.js";
import { sequelize } from "../db/dbIndex.js";
import { sleep } from "../lib/misc.js";

import * as db from "../db/dbIndex.js";
import * as errorCodes from "./errorCodes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

testDb = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Successfully Connected to Database");
  } catch (error) {
    console.error(
      "Failed to connect to Database, trying again in 5 seconds",
      error,
    );
    await sleep(5000);
    testDb();
  }
};

sequelize
  .sync({ force: false }) // Change to false when in prod
  .then(() => {
    console.log("Synced DB");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.sendFile(errorCodes.error418);
});

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
