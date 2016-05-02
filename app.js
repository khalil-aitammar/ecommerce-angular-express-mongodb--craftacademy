var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://localhost/ecom');

var Book = require('./models/film');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

filmRouter = require('./Routes/filmRoutes')(Book);


app.use('/api/films', filmRouter);


app.get('/', function(req, res){
   res.send('bienvenue ecom');
});

app.listen(port, function(){
   console.log('Gulp is running my app on  PORT: ' + port);
});