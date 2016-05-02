var express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

// connection a la base de données
var db = mongoose.connect('mongodb://localhost/ecom');

//import des model
var Film = require('./models/filmModel');
var Genre = require('./models/genreModel');

var app = express();

var port = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

filmRouter = require('./Routes/filmRoutes')(Film);

app.use(express.static(__dirname+'/client'));
app.use('/api/films', filmRouter);


app.get('/', function(req, res){
   res.send('bienvenue ecom');
});

app.listen(port, function(){
   console.log('Gulp is running my app on  PORT: ' + port);
});