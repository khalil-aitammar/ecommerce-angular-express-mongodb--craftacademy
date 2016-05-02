
// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var panier = new Schema({
    nombreArticle: Number,
    create_date:{
        type: Date,
        default: Date.now
    }
});


var User = new Schema({
    username: String,
    password: String,
    panier:[panier]
},{collection: 'Users'});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('user', User);