const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var User = new mongoose.Schema({
    username: {
        type: String,
        required: 'username can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
})

User.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,,:\s@"]+(\.[^<>()\[\]\\.,,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
User.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

User.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', User)

var Category = new mongoose.Schema({
    title: {
        type: String,
        required: 'username can\'t be empty'
    },
    cover: {
        type: String,
        required: 'cover can\'t be empty',
    },
    category: {
        type: String,
        required: 'category can\'t be empty',
    },
})

mongoose.model('Category',Category)

const commentSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });

var Blog = new mongoose.Schema({
    title: {
        type: String,
        required: 'username can\'t be empty'
    },
    cover: {
        type: String,
        required: 'cover can\'t be empty',
    },
    category: {
        type: String,
        required: 'category can\'t be empty',
    },
    description: {
        type: String,
        required: 'Description can\'t be empty',
    },
    date: {
        type: Date,
        required: 'Date can\'t be empty',
    },
    comments: [commentSchema]
})

mongoose.model('Blog',Blog)