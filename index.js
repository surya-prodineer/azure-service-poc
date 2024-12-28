require('dotenv').config();

const express = require('express');

require('./Crdentials/dbCredentials');

const _ = require('lodash');

const app = express();

const PORT = 3000;


app.get('/', async (req, res) => {
    res.send("<h1>Service Running!</h1>");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});