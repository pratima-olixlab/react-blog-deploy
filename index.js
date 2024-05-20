// require('./db');
// require('./config/configs.js');

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const bodyParser = require("body-parser");
// const path = require("path"); // Add this line for handling file paths

// app.use(bodyParser.json());

// const corsOrigin = {
//     origin: 'http://localhost:3000', // or whatever port your frontend is using
//     credentials: true,
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOrigin));

// // Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get("/", (req, resp) => {
//     resp.json({
//         message: "a simple api"
//     })
// })

// const rtsIndex = require('./routes/app.routes');
// app.use('/users', rtsIndex);

// app.listen(5000, () => {
//     console.log('app is running on 5000 port');
// })


require('./db');
require('./config/configs.js');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

const corsOrigin = {
    origin: 'http://localhost:3000', // or whatever port your frontend is using
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOrigin));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'react-app-main', 'build')));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define your API routes
const rtsIndex = require('./routes/app.routes');
app.use('/users', rtsIndex);

// Fallback to React's index.html for other routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'react-app-main', 'build', 'index.html'));
});

app.listen(5000, () => {
    console.log('app is running on port 5000');
});
