import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { PORT } from "./constants.js";
import { sequelize } from "./databaseConnection.js";

const app = express();
app.get("*", function (req, res) {
  const filePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "app",
    "index.html",
  );
  res.sendFile(filePath);
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
