"use strict";
const port = 7777;
let db = require('./db.js');
let express = require('express');
let app = new express();
let TopTenListItem = require('./models/TopTenListItem.js');
let TopTenList = require('./models/TopTenList.js');
let User = require('./models/User.js');


app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'top secret key', resave: false, saveUninitialized: false }));
let auth = require('./auth.js')(app);

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
