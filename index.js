require('dotenv').config();

const express = require('express');

const _ = require('lodash');

const { getDatabaseCredentials } = require('./Crdentials/dbCredentials');

const app = express();

const PORT = process.env.PORT || 3000;


app.get('/', async (req, res) => {
    res.send("<h1>Service Running!</h1>");
});

app.get('/info', async (req, res) => {
    const result = await getDatabaseCredentials();
    res.send(`${JSON.stringify(result)}`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});