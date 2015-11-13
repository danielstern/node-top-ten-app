"use strict";
module.exports = function(app){
	let passport = require('passport');
	let LocalStrategy = require('passport-local');
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	  },
	  function(username, password, done) {
		User.findOne({ username: username }, function (err, user) {
		  if (err) { return done(err); }
		  if (!user) { return done(null, false); }
		  if (!user.verifyPassword(password)) { return done(null, false); }
		  return done(null, user);
		});
	  }
	));

	app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/');
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