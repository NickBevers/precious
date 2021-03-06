const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    coins: Number,
    coinsTransferred : Number,
    isVerified: {
        type: Boolean,
        defaultValue: false
    }
});

User.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.model("User", User);