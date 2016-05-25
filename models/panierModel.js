var mongoose = require('mongoose');
Schema = mongoose.Schema;


var panierModel = new Schema({

    _id: { type : String , unique : true },
    articles: [{
        _id: { type : String , unique : true },
        qt:Number,
        titre:String,
        description:String,
        url_img:String,
        prix:Number,
        resD: Date,
        resF: Date
    }],
    create_date: {
        type: Date,
        default: Date.now
    },
}, {collection: 'panier'});

module.exports = mongoose.model('panier', panierModel);