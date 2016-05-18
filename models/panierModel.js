var mongoose = require('mongoose');
Schema = mongoose.Schema;


var panierModel = new Schema({
    _iduser: String,
    articles: [{
        idarticle: String,
        resD: Date,
        resF: Date
    }],
    create_date: {
        type: Date,
        default: Date.now
    },
}, {collection: 'panier'});


panier = mongoose.model('panier', panierModel);