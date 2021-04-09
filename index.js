require('dotenv').config();

const PORT = process.env.PORT || 8000;
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
