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
        .put(function (req, res) {
            console.log('fdfd', req.params.iduser);
            console.log('fdfd', req.body._id);
            console.log('body', req.body.qt);
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
                        console.log('put ok ',result);
                    }else{
                        res.json({"success": true, "message": "panier modifier film et qt ajouter"});
                    }
                });


        })

        .delete(function (req, res) {

            Board.findById(req.params.id, function (err, board) {
                if (err) {
                    res.json({"success": false, "message": "Board not found"});
                } else {
                    //Remove the board
                    Board.remove({_id: req.params.id}, function (err) {
                        if (err) {
                            res.json({"success": false, "message": "Error removing board"});
                        } else {
                            //Remove all cards associated to the board ID
                            Card.remove({board: req.params.id}, function (err) {
                                if (err) {
                                    res.json({"success": false, "message": "Error removing board cards"});
                                } else {
                                    res.json({
                                        "success": true,
                                        "message": "Board with id = " + req.params.id + " deleted"
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });


    return PanierRouter
};

module.exports = routes;