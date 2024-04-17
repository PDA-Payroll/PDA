import { env } from "process";

//webserver
export const PORT = 6969;

//database
export const DB_PORT = process.env.DB_PORT || 7734;
export const DB_NAME = process.env.POSTGRES_DB || "pdaDB";
export const DB_USER = process.env.POSTGRES_USER || "pdaAdmin";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PASSWORD = process.env.POSTGRES_PASSWORD || "postgres";
