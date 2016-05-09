var mongoose = require('mongoose');
Schema = mongoose.Schema;


var panierModel = new Schema ({
    film: [{ type: Schema.Types.ObjectId, ref: 'film' }],
    create_date:{
        type: Date,
        default: Date.now
    },
},{collection: 'panier'});


module.exports= mongoose.model('panier', panierModel);