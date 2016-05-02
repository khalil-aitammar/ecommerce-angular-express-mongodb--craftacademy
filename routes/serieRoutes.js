var express = require('express');


var routes = function(serie){
    var serieRouter = express.Router();

    serieRouter.route('/')
        .post(function(req, res){
            var serie = new serie(req.body);


            serie.save();
            res.status(201).send(serie);

        })
        .get(function(req,res){

            var query = {};

            if(req.query.genre)
            {
                query.genre = req.query.genre;
            }
            serie.find(query, function(err,series){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(series);
            });
        });

    serieRouter.use('/:filmId', function(req,res,next){
        Film.findById(req.params.filmId, function(err,serie){
            if(err)
                res.status(500).send(err);
            else if(film)
            {
                req.serie = serie;
                next();
            }
            else
            {
                res.status(404).send('no serie found');
            }
        });
    });
    serieRouter.route('/:serieId')
        .get(function(req,res){

            res.json(req.serie);

        })
        .put(function(req,res){
            req.serie.title = req.body.title;
            req.serie.author = req.body.discription;
            req.serie.genre = req.body.genre;
            req.serie.save(function(err){
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
                req.serie[p] = req.body[p];
            }

            req.serie.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.serie);
                }
            });
        })
        .delete(function(req,res){
            req.serie.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return serieRouter;
};

module.exports = routes;