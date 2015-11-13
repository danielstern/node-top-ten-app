"use strict";
let port = 7777;
let db = require('./db.js');
let express = require('express');
let app = new express();
let TopTenListItem = require('./models/TopTenListItem.js');
let TopTenList = require('./models/TopTenList.js');
let User = require('./models/User.js');

/* Authentication */
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

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'top secret key', resave: false, saveUninitialized: false }));

app.use(express.static('app'));

app.route(`/api/items`)
.get((req,res)=>{
	TopTenListItem.find(function(error, doc){
		res.send(doc);
	});
});
app.route(`/api/lists`)
.get((req,res)=>{
	TopTenList.find(function(error, doc){
		res.send(doc);
	});
})

app.listen(port,()=>{console.log(`App listening on port ${port}.`)});
