"use strict";
module.exports = function(app){
	let passport = require('passport');
	let LocalStrategy = require('passport-local');
	let local = new LocalStrategy(function(username, password, done) {
		console.log("Attempting login:", username);
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }
			if (!user.verifyPassword(password)) { return done(null, false); }
			return done(null, user);
		});
	});
	
	passport.use(local);

//	app.post('/login', passport.authenticate('local'), function(req, res) {	
//		console.log("Login");
//		res.status(301).send();
//	});
	
	app.post('/login', function(req, res, next) {
	  console.log("Login");
	  passport.authenticate('local', function(err, user, info) {
		
		if (err) { return next(err); }
		if (!user) { 
			console.log("error no user");
			res.status(404).send();
			//return res.redirect('/login'); 
		}
	//	req.logIn(user, function(err) {
	//	  if (err) { return next(err); }
		  //return res.redirect('/users/' + user.username);
	//	});
	  })(req, res, next);
	});

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
}