var express = require('express');

var routes = function (Film) {
    var FilmRouter = express.Router();

    FilmRouter.route('/')

        .post(function (req, res) {
            console.log(req.body.dateresD, req.body.dateresF);
            var film = new Film();
            film.titre = req.body.titre;
            film.description = req.body.description;
            film.genre = req.body.genre;
            film.url_img = req.body.url_img;
            film.prix = req.body.prix;
            film.dateresD = req.body.dateresD;
            film.dateresF = req.body.dateresF;
            film.save();
            res.status(201).send(film);
            console.log(film);
        })
        .get(function (req, res) {

            Film.find(function (err, Films) {
                if (err) {
                    console.log(err)
                }
                ;
                res.json(Films);
            });
        });
    FilmRouter.route('/:idarticle')
    //film par id
        .get(function (req, res) {
            console.log(req.params.idarticle);
            Film.findById(req.params.idarticle, function (err, film) {
                if (err) {
                    res.json({"success": false, "message": err});
                } else {
                    res.json(film);
                }
            });
        })
    // remove user
    FilmRouter.route('/remove/:idarticle')
        .get( function (req, res) {
        console.log(req.params.userid);
        Film.findByIdAndRemove(req.params.idarticle, function (err, film) {
            if (err) {
                res.send(err);
            }
            else {
                var response = {
                    message: "film successfully deleted",

                };
                res.send(response);
            }
        });
    });



    return FilmRouter
};

module.exports = routes;