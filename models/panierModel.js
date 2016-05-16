var mongoose = require('mongoose');
Schema = mongoose.Schema;


var panierModel = new Schema({
    iduser:String,
    articles: [{

        resD: Date,
        resF: Date
    }],
    create_date: {
        type: Date,
        default: Date.now
    },
}, {collection: 'panier'});


module.exports = mongoose.model('panier', panierModel);