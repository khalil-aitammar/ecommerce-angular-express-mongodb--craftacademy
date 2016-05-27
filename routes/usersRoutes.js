var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/userModel');

router.get('/', function(req, res) {
    User.find(function (err,Users) {
        if(err){console.log(err)};
        res.json(Users);
    });
});

router.delete(function (req, res) {

    User.findById(req.params.id, function (err, board) {
        if (err) {
            res.json({"success": false, "message": "User not found"});
        } else {
            //Remove the board
            User.remove({_id: req.params.id}, function (err) {
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





router.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username, usermail: req.body.usermail }),
        req.body.password, function(err, User) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function () {
                res.send(User._id);
            });
        });

});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }



            res.status(200).json({
                status: 'Login successful!',
                userid:user._id,
                usermail: user.usermail,
                username:user.username,
                role:user.role
            });

        });
        console.log(res.user);

    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

router.get('/session',function(req,res){
    if(!req.session.passport){
        return res.status(404).send("session not found");
    }else{
        res.status(200).json({
            status: true
        });
    }
});






module.exports = router;