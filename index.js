const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// Parse connection string manually
const connectionString = process.env.DefaultConnection;

const config = {
    server: connectionString.match(/Server=tcp:(.*?),/)[1],
    database: connectionString.match(/Initial Catalog=(.*?);/)[1],
    user: connectionString.match(/User ID=(.*?);/)[1],
    password: connectionString.match(/Password=(.*?);/)[1],
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

app.get('/', (req, res) => {
    res.send('Azure + SQL Connected 🚀');
});

app.get('/data', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM TestTable');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});