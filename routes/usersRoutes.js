var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/userModel');


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
                username:user.username
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