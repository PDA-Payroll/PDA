import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./databaseConnection.js";

import { PORT } from "./constants.js";
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/api/ping", (req, res) => {
  res.send({
    mesg: "Hellow, World",
  });
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
