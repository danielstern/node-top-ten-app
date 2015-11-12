"use strict";
let port = 7777;
var db = require('./db.js');
var express = require('express');
var app = new express();

app.use(express.static('app'));

app.route(`/api/items`)
.get((req,res)=>{
//	Mongoose.Model(	.find(function(error,doc){
//		res.send(doc);
//	})
})

app.listen(port,()=>{console.log(`App listening on port ${port}.`);});
