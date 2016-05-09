var mongoose = require('mongoose');
Schema = mongoose.Schema;
var filmModel=require('./filmModel');

var panierModel = new Schema ({
    articlebey: [filmModel],
    create_date:{
        type: Date,
        default: Date.now
    },
},{collection: 'panier'});


module.exports= mongoose.model('panier', panierModel);