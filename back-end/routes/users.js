/* Modules imports */
var express = require('express');
var router = express.Router();
var passport = require('../helpers/index');

/* Controllers imports */
var newUser = require('../controllers/users');
var myAccount = require('../controllers/displayUser');

/* POST new user in collection Mongo. */
router.post('/', function(req, res) {
  newUser.createUser(req, res);
});


/* POST permet de connecter l'utilisateur. */
router.post('/login', passport.authenticate('local'), function(req, res) {

    var dataUser = req.user;

    if(req.user) {
        console.log(dataUser);
        res.json({
            message: "Vous êtes connecté à votre dashboard.",
            user: dataUser
        });
    }
});


/* GET permet de déconnecter l'utilisateur. */
router.get('/logout', function(req, res) {
  req.logout();
  res.json({logout: true});
});


/* GET display user account. */
router.get('/user', function(req, res) {
    myAccount.displayMyAccount(req, res);
});

/* GET display markers */
router.get('/map', function(req, res) {
  myAccount.displayMyAccount(req, res);
});

module.exports = router;