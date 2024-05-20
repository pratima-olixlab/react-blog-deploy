require('./db');
require('./config/configs.js');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

const corsOrigin = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOrigin));

app.use(express.static(path.join(__dirname, 'react-app-main', 'build')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const rtsIndex = require('./routes/app.routes');
app.use('/users', rtsIndex);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'react-app-main', 'build', 'index.html'));
});

app.listen(5000, () => {
    console.log('app is running on port 5000');
});
