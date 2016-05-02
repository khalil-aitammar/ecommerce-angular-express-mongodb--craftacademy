var express = require('express');


var routes = function(Genre){
    var genreRouter = express.Router();

    genreRouter.route('/')
        .post(function(req, res){
            var genre = new genre(req.body);


            genre.save();
            res.status(201).send(genre);

        })
        .get(function(req,res){

            Genre.find(query, function(err,genres){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(genres);
            });
        });


    return genreRouter;
};

module.exports = routes;