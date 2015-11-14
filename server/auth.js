"use strict";
let User = require('./models/User.js');
let passport = require('passport');
let LocalStrategy = require('passport-local');
module.exports = function(app){
	
	let local = new LocalStrategy(function(username, password, done) {
		console.log("Attempt local strat...",username,password);
		//throw new Error("!!!!");
		User.findOne({ username: username }, function (err, user) {
			console.log("Found..?",user);
			if (err) { return done(err); }
			if (!user) { return done(null, false); }
			if (user.password != password) { return done(null, false); }
			return done(null, user);
		});
	});
	
	passport.use(local);

	app.post('/login', function(req, res, next) {
	  console.log("Login");
	  passport.authenticate('local', function(err, user, info) {
		console.log("Authenticate good",err,user,info);
		if (err) { return next(err); }
		if (!user) { 
			console.log("error no user");
			res.status(404).send();
			//return res.redirect('/login'); 
		};
		if (user) {
			res.status(200).send();
		}
	  })(req, res, next);
	});

//	passport.serializeUser(function(user, cb) {
//	  cb(null, user.id);
//	});
//
//	passport.deserializeUser(function(id, cb) {
//	  User.findById(id, function (err, user) {
//		if (err) { return cb(err); }
//		cb(null, user);
//	  });
//	});

	app.use(passport.initialize());
	app.use(passport.session());
}