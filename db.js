// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://olixlab22:OlixLab1@cluster0.w9ceppl.mongodb.net/mern-stack-react')
//   .then(() => {
//     console.log('MongoDB connection succeeded');
//   })
//   .catch((err) => {
//     console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
//   });

// require('./models/user.model'); //This line imports the Mongoose model for the 'User' schema.

// module.exports = mongoose;





// const mongoose = require('mongoose');
// require('dotenv').config();

// const dbUri = process.env.MONGODB_URI;
// console.log('dbUri:::::::::::::::::::::::::::::',dbUri);
// mongoose.connect(dbUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('MongoDB connection succeeded');
//   })
//   .catch((err) => {
//     console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
//   });

// require('./models/user.model'); // This line imports the Mongoose model for the 'User' schema.

// module.exports = mongoose;



const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the appropriate .env file
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

console.log('env:::::::::::::::::',env, process.env.MONGODB_URI, process.env.PORT);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connection succeeded');
})
.catch((err) => {
  console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2));
});

require('./models/user.model'); // Import the Mongoose model for the 'User' schema

module.exports = mongoose;
