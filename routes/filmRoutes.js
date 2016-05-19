var express = require('express');

var routes = function(Film){
    var FilmRouter = express.Router();

    FilmRouter.route('/')
   
        .post(function(req,res){
            var film = new Film();
            film.titre=req.body.titre;
            film.description=req.body.description;
            film.url_img=req.body.url_img;
            film.prix=req.body.prix;
            film.save();
            res.status(201).send(film);
        })
        .get(function(req,res){
       
            Film.find(function (err,Films) {
                if(err){console.log(err)};
                res.json(Films);
            });
        });
    FilmRouter.route('/:idarticle')
    //film par id
        .get(function(req,res) {
            console.log(req.params.idarticle);
            Film.findById(req.params.idarticle, function(err, film) {
                if(err) {
                    res.json({"success": false, "message": err});
                } else {
                    res.json(film);
                }
            });
        })

    return FilmRouter
};

module.exports = routes;