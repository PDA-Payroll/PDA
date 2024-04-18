import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./databaseConnection.js";
import cors from "cors";

import { PORT } from "./constants.js";
const app = express();

const error418 = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "errorResponse",
  "418.html",
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(error418);
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
