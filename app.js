var express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy,
    debug = require('debug')('passport-mongo'),
    http = require('http');

// connection a la base de données
var db = mongoose.connect('mongodb://localhost/ecom');

//import des model
var Film = require('./models/filmModel');
var Serie = require('./models/seriesModel');
var Genre = require('./models/genreModel');
var User = require('./models/userModel');
var userRoutes = require('./routes/userRoutes');

var app = express();

var port = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', userRoutes);












filmRouter = require('./Routes/filmRoutes')(Film);

app.use(express.static(__dirname+'/client'));
app.use('/api/films', filmRouter);


app.get('/', function(req, res){
   res.send('bienvenue ecom');
});

app.listen(port, function(){
   console.log('Gulp is running my app on  PORT: ' + port);
});