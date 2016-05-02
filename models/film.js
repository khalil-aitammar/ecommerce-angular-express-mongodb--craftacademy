var mongoose = require('mongoose');
 Schema = mongoose.Schema;


var filmsShema = new Schema ({
    titre : String,
    discription : String,
    genre : String,
    prix : number,
    create_date:{
        type: Date,
        default: Date.now
    },
},{collection: 'books'});

 var film = mongoose.model('film',filmsShema);
model.exports= film;