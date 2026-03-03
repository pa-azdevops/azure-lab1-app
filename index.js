const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
    connectionString: process.env.DefaultConnection
};

app.get('/', (req, res) => {
    res.send('Azure + SQL Connected 🚀');
});

app.get('/data', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM TestTable`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});