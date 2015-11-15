"use strict";
const port = 7777;
let db = require('./db.js');
let express = require('express');
let app = new express();
let TopTenListItem = require('./models/TopTenListItem.js');
let TopTenList = require('./models/TopTenList.js');
let User = require('./models/User.js');

app.use(express.static('app'));
//app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'top secret key', resave: false, saveUninitialized: false }));
let passport = require('./auth.js')(app);

// no static?
/* app.get('/', function(req, res) {
    res.render('index');
});*/


app.route(`/api/items`)
.get((req,res)=>{
	console.log("Get items...",req.isAuthenticated());
	if (req.isAuthenticated()) {
		TopTenListItem.find(function(error, doc){
			res.send(doc);
		});
	} else {
		res.status(401).send();
	}

});
app.route(`/api/lists`)
.get((req,res)=>{
	TopTenList.find(function(error, doc){
		res.send(doc);
	});
})

app.route('/login')
.post(function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) {
			res.status(404).send();
		};
		if (user) {
			console.log("Successfully authenticated user.")	;
			res.header("Access-Control-Allow-Credentials", "true");
			req.login(user,function(err){
				res.status(200).send(user);
				next(user);
			});
		}
	})(req, res, next);
});

app.listen(port,()=>{console.log(`App listening on port ${port}.`)});
