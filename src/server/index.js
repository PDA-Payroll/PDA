import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

//////// DATABASE /////////
// Environmental Variables //
const PORT = 6969;
const DB_PORT = 7734;
const DB_NAME = process.env.DB_NAME || 'pdaDB';
const DB_USER = process.env.DB_USER || 'pdaAdmin';
const DB_HOST = process.env.DB_HOST || 'localhost';

// SETUP //
// This basically just checks if there is a database created.  If there is not create one, else, note there is one in the log.  This should be quite apparent from the code
async function setupDatabase() {
    const client = new pg.Client({
        port: DB_PORT,
        host: DB_HOST,
        password: "postgres",
        user: DB_USER,
        database: DB_NAME
    })
    await client.connect();

    try{
        const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);

        if (res.rowCount === 0) {
            console.log(`${DB_NAME} database not found, creating it.`);
            await client.query(`CREATE DATABASE "${DB_NAME}";`);
            console.log(`created database ${DB_NAME}`);
        } else {
            console.log(`${DB_NAME} database exists.`);
        }
    } catch (err) {
        console.err(err);
    } finally {
        await client.end()
    }
    console.log('client has disconnected')
}

////// WEBSERVER //////
//#This is basically just hosting this to whatever port is chosen in PORT
const app = express()
app.get('*', function (req, res) {
    const filePath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "..",
        "app",
        "index.html"
    )
    res.sendFile(filePath)
})

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`)
})

setupDatabase();
