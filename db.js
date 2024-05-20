const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/mern-stack-react')
  .then(() => {
    console.log('MongoDB connection succeeded');
  })
  .catch((err) => {
    console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
  });

require('./models/user.model'); //This line imports the Mongoose model for the 'User' schema.

module.exports = mongoose;