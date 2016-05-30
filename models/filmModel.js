var mongoose = require('mongoose');
Schema = mongoose.Schema;


var filmModel = new Schema({
    
    titre: {type: String, required: true},
    description: {type: String, required: true},
    genre: String,
    url_img: {type: String, required: true},
    prix: {type: Number, required: true},
    dateresD:{type: Date, required: true},
    dateresF:{type: Date, required: true},
    create_date: {
        type: Date,
        default: Date.now
    },
}, {collection: 'films'});


module.exports = mongoose.model('film', filmModel);