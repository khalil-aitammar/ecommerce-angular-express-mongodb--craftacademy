var express = require('express');

var routes = function (Panier) {
    var PanierRouter = express.Router();

    PanierRouter.route('/')
    // ajouter panier
        .post(function (req, res) {
            var panier = new Panier();
            panier._id = req.body.iduser;
            panier.save();
            res.status(201).send(panier);
        })
        // GET all panier

        .get(function (req, res) {
            Panier.find(function (err, Paniers) {
                if (err) {
                    console.log(err)
                }
                ;
                res.json(Paniers);
            });
        });

    PanierRouter.route('/:iduser')
    //panier par id user
        .get(function (req, res) {
            Panier.findById(req.params.iduser, function (err, panier) {
                if (err) {
                    res.json({"success": false, "message": "panier not found"});
                } else {
                    res.json(panier);
                }
            });
        })
        // post nouvel article
        .post(function (req, res) {
            Panier.findById(req.params.iduser, function (err, Panier) {
                if (err) {
                    res.json({"success": false, "message": "Panier not found"});
                } else {
                    console.log('panier route',Panier.articles);

                    Panier.articles.push({
                        _id: req.body._id,
                        qt: req.body.qt,
                        titre:req.body.titre,
                        description:req.body.description,
                        prix:req.body.prix,
                        url_img:req.body.url_img,
                    });
                    Panier.save(function (err) {
                        if (err) return handleError(err)
                        console.log('Success!');
                    });
                }
            });
        })


        // put modif article
        .put(function (req, res) {

            Panier.findOneAndUpdate(
                {
                    _id: req.params.iduser,
                    'articles._id': req.body._id
                },
                {
                    $set: {
                        'articles.$.qt': req.body.qt
                    }
                },

                function (err, result) {
                    if (!err) {
                        console.log('put ok ', result);
                    } else {
                        res.json({"success": true, "message": "panier modifier film et qt ajouter"});
                    }
                });


        })
    PanierRouter.route('/:iduser/:idarticle')
        // remove articles
        .post(function (req, res) {

            Panier.update(
                { _id: req.params.iduser },
                { $pull: { articles : { _id : req.params.idarticle } } },
                { safe: true },
                function removeConnectionsCB(err, obj) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json({"success": true, "message": "film remove du panier"});
                    }
                });
        })





    return PanierRouter
};

module.exports = routes;