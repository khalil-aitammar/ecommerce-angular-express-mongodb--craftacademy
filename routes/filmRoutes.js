var express = require('express');

var routes = function(Film){
    var FilmRouter = express.Router();

    FilmRouter.route('/')
   
        .post(function(req,res){
            var film = new Film();
            film.titre=req.body.titre;
            console.log(req.body.titre);
            film.save();
            res.status(201).send(film);
        })
        .get(function(req,res){
       
            Film.find(function (err,Films) {
                if(err){console.log(err)};
                res.json(Films);
            });
        });


    return FilmRouter
};

module.exports = routes;