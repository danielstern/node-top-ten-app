"use strict";
let User = require('./models/User.js');
let passport = require('passport');
let LocalStrategy = require('passport-local');
module.exports = function(app){
	
	let local = new LocalStrategy(function(username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }
			if (user.password != password) { return done(null, false); }
			return done(null, user);
		});
	});
	
//	var isAuthenticated = function (req, res, next) {
//		if (req.isAuthenticated()) {
//			return next();
//		}
//	  	//res.redirect('/');
//	}
	passport.use(local);



	passport.serializeUser(function(user, cb) {
	  cb(null, user.id);
	});

	passport.deserializeUser(function(id, cb) {
	  User.findById(id, function (err, user) {
		if (err) { return cb(err); }
		cb(null, user);
	  });
	});

	app.use(passport.initialize());
	app.use(passport.session());

	return passport;
}
