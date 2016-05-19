var express = require('express');

var routes = function (Panier) {
    var PanierRouter = express.Router();
 
    PanierRouter.route('/')
        .post(function (req, res) {
            var panier = new Panier();
            panier._id = req.body.iduser;
            panier.save();
            res.status(201).send(panier);
        })
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
        .put(function(req,res) {
            Panier.findById(req.params.iduser, function(err, Panier) {
                if(err) {
                    res.json({"success": false, "message": "Panier not found"});
                } else {
                    board.save(function(err, Panier) {
                        if(err) {
                            res.json({"success": false, "message": "Error saving Panier"});
                        } else {
                            res.json({"success": true, "modif": Panier});
                        }
                    });
                }
            });
        })

        .delete(function(req,res) {
       
            Board.findById(req.params.id, function(err, board) {
                if(err) {
                    res.json({"success": false, "message": "Board not found"});
                } else {
                    //Remove the board
                    Board.remove({_id : req.params.id}, function(err) {
                        if(err) {
                            res.json({"success": false, "message": "Error removing board"});
                        } else {
                            //Remove all cards associated to the board ID
                            Card.remove({board: req.params.id}, function(err) {
                                if(err) {
                                    res.json({"success": false, "message": "Error removing board cards"});
                                } else {
                                    res.json({"success": true, "message": "Board with id = " + req.params.id + " deleted"});
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