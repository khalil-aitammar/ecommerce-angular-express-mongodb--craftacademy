var mongoose = require('mongoose');
 Schema = mongoose.Schema;


var genreModel = new Schema ({
    name : String,
    
},{collection: 'genres'});


module.exports= mongoose.model('genre', genreModel);