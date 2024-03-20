import express from "express"
import path from "path"
import { fileURLToPath } from "url";
import pg from "pg"

const PORT = 6969;
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
