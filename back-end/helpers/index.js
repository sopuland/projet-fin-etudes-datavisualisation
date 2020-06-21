const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/Users');

// Fonctions par défaut de Passport

// Permet de sauvegarder l'ID de session
passport.serializeUser((user, done) => {
	done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {

	User.findOne(
		{ _id: id },
		(err, user) => {
			done(null, user);
		}
	)
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport;