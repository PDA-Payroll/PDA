import { Sequelize } from "sequelize";

import * as config from "../constants.js";
import { sleep } from "./misc.js";
import { setupAssociation } from "../db/dbIndex.js";

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
export const initDbConnection = async () => {
	sequelize
		.sync({ force: true }) // Change to false when in prod
		.then(() => {
			console.log("Synced DB");
		})
		.then(setupAssociation())
		.catch(async (err) => {
			console.log("Failed to sync db: " + err.message);
			await sleep(5000);
			return initDbConnection();
		});
};
