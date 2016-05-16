var express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    path = require('path'),
    LocalStrategy = require('passport-local').Strategy,
    passport = require('passport'),
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
var Film = require('./models/filmModel');

var User = require('./models/userModel');
var userRoutes = require('./routes/userRoutes');
var Panier = require('./models/panierModel');
var app = express();

var port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// permet à express de décoder les données contenues dans les cookies
app.use(cookieParser());

// lecture du contenu des requetes
app.use(bodyParser());

//permet l'utilisation de requetes du type DELETE et PUT
app.use(methodOverride());

// nécessaire pour l'utilisation des sessions. secret sert à signer le cookie
app.use(session({ secret: "private" , cookie: { maxAge: 30000 }}));

// Initialisation de PassportJs ansi que du système de session
app.use(passport.initialize());
app.use(passport.session());

app.use(require('express-session')({
   secret: "private",
   resave: false,
   saveUninitialized: false
}));
// Initialisation de PassportJs ansi que du système de session
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// configure passport
// auth
function findById(id, fn) {
   var idx = id - 1;
   if (users[idx]) {
      fn(null, users[idx]);
   } else {
      fn(new Error("User " + id + " does not exist"));
   }
}

function findByUsername(username, fn) {
   for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      if (user.username === username) {
         return fn(null, user);
      }
   }
   return fn(null, null);
}

passport.use(new LocalStrategy(
    function(username, password, done) {

       process.nextTick(function () {

          findByUsername(username, function(err, user) {
             if (err) { return done(err); }
             if (!user) { return done(null, false, { message: "Utilisateur inconnu : " + username }); }
             if (user.password !== password) { return done(null, false, { message: "Mot de passe invalide" }); }
             return done(null, user);
          });
       });
    }
));

passport.serializeUser(function(user, done) {
   done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   findById(id, function (err, user) {
      done(err, user);
   });
});



var auth = function(req, res, next) {
   if (!req.isAuthenticated()) {
      res.send(401);
   } else {
      next();
   }
};




// routes
app.use('/user/', userRoutes);





filmRouter = require('./routes/filmRoutes')(Film);
panierRouter = require('./routes/panierRoutes')(Panier);
app.use(express.static(__dirname+'/client'));
app.use('/api/films', filmRouter);
app.use('/user/panier', panierRouter);

app.get('/',auth, function(req, res){
   res.send('bienvenue ecom');
});
app.get("/api/films", auth, function(req, res, next) {
   res.send({content:"je suis une donnée protégée"});
});

app.listen(port, function(){
   console.log('Gulp is running my app on  PORT: ' + port);
});