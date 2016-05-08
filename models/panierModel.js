var mongoose = require('mongoose');
Schema = mongoose.Schema;


var filmModel = new Schema ({
    idarticles : [],
    create_date:{
        type: Date,
        default: Date.now
    },
},{collection: 'films'});


module.exports= mongoose.model('film', filmModel);