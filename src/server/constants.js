//webserver
export const PORT = 6969;

//database
export const DB_PORT = 7734;
export const DB_NAME = process.env.DB_NAME || "pdaDB";
export const DB_USER = process.env.DB_USER || "pdaAdmin";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PASSWORD = process.env.DB_HOST || "postgres";
