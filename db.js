const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://olixlab22:OlixLab1@cluster0.w9ceppl.mongodb.net/mern-stack-react')
  .then(() => {
    console.log('MongoDB connection succeeded');
  })
  .catch((err) => {
    console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
  });

require('./models/user.model'); //This line imports the Mongoose model for the 'User' schema.

module.exports = mongoose;

// const mongoose = require('mongoose');
// require('dotenv').config();
// require('./config/configs');

// const dbUri = process.env.MONGODB_URI;

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
