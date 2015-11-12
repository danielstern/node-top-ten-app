"use strict";
let port = 7777;
var db = require('./db.js');
var express = require('express');
var app = new express();
let TopTenListItem = require('./models/TopTenListItem.js');

app.use(express.static('app'));

app.route(`/api/items`)
.get((req,res)=>{
	TopTenListItem.find(function(error,doc){
		res.send(doc);
	});
})

app.listen(port,()=>{console.log(`App listening on port ${port}.`);});
