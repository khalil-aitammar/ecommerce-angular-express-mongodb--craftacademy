var mongoose = require('mongoose');
Schema = mongoose.Schema;


var serieModel = new Schema ({
    titre : String,
    description : String,
    genre : String,
    url_img : String,
    prix : Number,
    create_date:{
        type: Date,
        default: Date.now
    },
},{collection: 'series'});


module.exports= mongoose.model('serie', serieModel);