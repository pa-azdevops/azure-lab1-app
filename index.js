const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const connectionString = process.env.DB_CONNECTION_STRING;

if (!connectionString) {
    console.error("❌ DB_CONNECTION_STRING not found!");
}

app.get('/', (req, res) => {
    res.send('Azure + SQL Connected 🚀');
});

app.get('/data', async (req, res) => {
    try {
        await sql.connect({
            connectionString: connectionString,
            options: {
                encrypt: true,
                trustServerCertificate: false
            }
        });

        const result = await sql.query('SELECT * FROM TestTable');
        res.json(result.recordset);

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database connection failed: " + err.message);
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});