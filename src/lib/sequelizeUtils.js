import { Sequelize } from "sequelize";

import * as config from "../constants.js";

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
export const syncDb = () => {
  sequelize
    .sync({ force: false }) // Change to false when in prod
    .then(() => {
      console.log("Synced DB");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
};
