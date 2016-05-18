var express = require('express');

var routes = function(Panier){
    var PanierRouter = express.Router();

    PanierRouter.route('/')

        .post(function(req,res){
            var panier = new Panier();
            panier._id=req.body.iduser;

            panier.save();
            res.status(201).send(panier);
        })
        .get(function(req,res){

            Panier.find(function (err,Paniers) {
                if(err){console.log(err)};
                res.json(Paniers);
            });
        });


    return PanierRouter
};

module.exports = routes;