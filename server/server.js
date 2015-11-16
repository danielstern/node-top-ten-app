"use strict";
const port = 7777;
let db = require('./db.js');
let express = require('express');
let app = new express();
let TopTenListItem = require('./models/TopTenListItem.js');
let TopTenList = require('./models/TopTenList.js');
let User = require('./models/User.js');
let React = require('React');
require('babel-core/register');

app.use(express.static('app'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'top secret key', resave: false, saveUninitialized: false }));
let passport = require('./auth.js')(app);

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
app.route(`/api/list`)
.get((req,res)=>{
	if (!req.user) {
		res.status(400).send()
		return;
	}
	TopTenList.findOne({ owner : req.user._id },function(error, list){
		if (!list) {
			return res.status(500).send();
		}
		TopTenListItem.find({ list : list._id },function(error, items){			
			res.send({
				name:list.name,
				items: items
			});
		});
	});
})

app.route('/api/user')
.get(function(req, res, next) {
	if (req.isAuthenticated()){
		res.header("Access-Control-Allow-Credentials", "true");
		res.status(200).json(req.user);
	} else {
		res.status(201).send(null);
	}
 });

app.route('/login')
.post(function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) {
			res.status(201).send();
		};
		if (user) {
			req.login(user,function(err){
				res.status(200).json(user);
			});
		}
	})(req, res, next);
});

app.route('/logout')
.post(function(req, res, next) {
	req.logout();
	res.status(200).send();
});

app.get('/',function(req,res){
	let app = React.createFactory(require('./../app/components/TopTenList.js'));
	if (req.isAuthenticated()) {
		TopTenList.findOne({ owner : req.user._id },function(error, list){
			TopTenListItem.find({ list : list._id },function(error, items){
				//console.log("Items?")
				var generated = React.renderToString(app({
					list:{items},
					user:req.user
				}));
				res.render('./../app/index.ejs',{reactOutput:generated});	
			});
		});
	} else {
		var generated = React.renderToString(app({
			items:{items:[]},
			user:null
		}));
		res.render('./../app/index.ejs',{reactOutput:generated});
	}
})

app.listen(port,()=>{console.log(`App listening on port ${port}.`)});
