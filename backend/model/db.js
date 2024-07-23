const mongoose = require('mongoose');
const env = require('dotenv');

env.config();

mongoose.connect(process.env.DB_LINK);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String 
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User
};

