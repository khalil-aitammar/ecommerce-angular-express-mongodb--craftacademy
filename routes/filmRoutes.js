var express = require('express');


var routes = function (Film) {
    var filmRouter = express.Router();
    // ajouter un film

    filmRouter.route('/')
        .post(function (req, res) {
            Film.create({ //creates board
                    titre: req.body.titre,
                    description: req.body.description,
                    url_img: req.body.url_img
                },
                function (err, createdFilm) {
                    if (err) {
                        res.json('erreur creation film', err);
                    } else {
                        res.json('success creation film ', createdFilm);
                    }
                });
        })
        // get all film
        .get(function (req, res) {
            Film.find({}, function (err, film) {
                if (err) {
                    res.json('erreur get film', err);
                } else {
                    res.json('success get film ', film);
                }
            });
        })

    // get un seul film

    filmRouter.use('/:filmId', function (req, res, next) {
        Film.findById(req.params.filmId, function (err, film) {
            if (err)
                res.status(500).send(err);
            else if (film) {
                req.film = film;
                next();
            }
            else {
                res.status(404).send('no film found');
            }
        });
    });
    filmRouter.route('/:filmId')
        .get(function (req, res) {
            res.json(req.film);
        })
        .put(function (req, res) {
            req.film.title = req.body.title;
            req.film.author = req.body.discription;
            req.film.genre = req.body.genre;
            req.film.read = req.body.read;
            req.film.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.book);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.film[p] = req.body[p];
            }

            req.film.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.film);
                }
            });
        })
        .delete(function (req, res) {
            req.film.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return filmRouter;
};

module.exports = routes;