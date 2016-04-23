var mongoose = require('mongoose');
 Schema = mongoose.Schema;


var filmsShema = new Schema ({
    titre : String,
    discription : String,
    prix : number
});

 var film = mongoose.model('film',filmsShema);
model.exports= film;