var express = require('express');


var routes = function(Film){
    var filmRouter = express.Router();

    filmRouter.route('/')
        .post(function(req, res){
            var film = new film(req.body);


            film.save();
            res.status(201).send(film);

        })
        .get(function(req,res){

            var query = {};

            if(req.query.genre)
            {
                query.genre = req.query.genre;
            }
            Film.find(query, function(err,films){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(films);
            });
        });

    filmRouter.use('/:filmId', function(req,res,next){
        Film.findById(req.params.filmId, function(err,film){
            if(err)
                res.status(500).send(err);
            else if(film)
            {
                req.film = film;
                next();
            }
            else
            {
                res.status(404).send('no film found');
            }
        });
    });
    filmRouter.route('/:filmId')
        .get(function(req,res){

            res.json(req.film);

        })
        .put(function(req,res){
            req.film.title = req.body.title;
            req.film.author = req.body.discription;
            req.film.genre = req.body.genre;
            req.film.read = req.body.read;
            req.film.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.book);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.film[p] = req.body[p];
            }

            req.film.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.film);
                }
            });
        })
        .delete(function(req,res){
            req.film.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return filmRouter;
};

module.exports = routes;