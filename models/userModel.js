
// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    username: String,
    usermail :String,
    password: String,
    panier  : Schema.ObjectId
},{collection: 'Users'});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('user', User);