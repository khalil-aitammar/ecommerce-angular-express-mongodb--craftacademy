var mongoose = require('mongoose');
 Schema = mongoose.Schema;


var filmModel = new Schema ({
    titre : String,
    description : String,
    genre : String,
    url_img : String,
    prix : Number,
    create_date:{
        type: Date,
        default: Date.now
    },
},{collection: 'films'});


module.exports= mongoose.model('film', filmModel);