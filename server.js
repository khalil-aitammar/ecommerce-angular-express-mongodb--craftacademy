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

// connexion vers la base de donnée ecom
mongoose.connect('mongodb://localhost/ecom', function(err) {
   if (err) {
      console.log("Connection to mongoDB failed => " + err);
      // throw err;
   } else {
      console.log("Connection established to mongoDB");
   }
});

//import des model
var User = require('./models/userModel');
var userRoutes = require('./routes/usersRoutes');

var app = express();

var port = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// permet à express de décoder les données contenues dans les cookies
app.use(cookieParser());


app.use(require('express-session')({
   secret: "private",
   cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
   },
   resave: false,
   saveUninitialized: false
}));
// Initialisation de PassportJs ansi que du système de session
app.use(passport.initialize());


app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/** when you're in the '/products' the productRouter will handle it*/
var Film = require('./models/filmModel');
filmRouter = require('./Routes/filmRoutes')(Film);
app.use('/api/films', filmRouter);


var Panier = require('./models/panierModel');
panierRouter = require('./routes/panierRoutes')(Panier);
app.use('/api/panier', panierRouter);

// routes
app.use('/user', userRoutes);


app.use(express.static(__dirname+'/client'));



app.get('/', function(req, res){
   res.send('bienvenue ecom');
});

app.listen(port, function(){
   console.log('Gulp is running my app on  PORT: ' + port);
});