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

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
    }
})

const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
};

