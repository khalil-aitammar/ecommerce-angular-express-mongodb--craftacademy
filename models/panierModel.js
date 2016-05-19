var mongoose = require('mongoose');
Schema = mongoose.Schema;


var panierModel = new Schema({

    _id: String,
    articles: [{
        idarticle: String,
        qt:Number,
        resD: Date,
        resF: Date
    }],
    create_date: {
        type: Date,
        default: Date.now
    },
}, {collection: 'panier'});

module.exports = mongoose.model('panier', panierModel);