import express from "express";
import { sequelize } from "./databaseConnection.js";
import cors from "cors";

import { PORT } from "./constants.js";
import * as errorCodes from "./errorCodes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(errorCodes.error418);
});

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});

try {
  await sequelize.authenticate();
  console.log("Successfully Connected to Database");
} catch (error) {
  console.error("Failed to connect to Database", error);
}
