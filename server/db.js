"use strict";
let mongoose = require(`mongoose`);

let User = require('./models/User.js');
let TopTenList = require('./models/TopTenList.js');
let TopTenListItem = require('./models/TopTenListItem.js');

mongoose.connect(`mongodb://localhost/topten`,()=>{	
	mongoose.connection.db.dropDatabase();
	
	let list = new TopTenList({name:`Favorite Songs`}).save();
	let user = new User({username:"guest",password:"test"});
	
	let initialItems = [1,2,3,4,5,6,7,8,9,10]
		.map((n)=>{return {name:`Item ${n}`, rank:n, list:list._id}});

	initialItems.forEach(function(item){
		new TopTenListItem(item).save();
	});

	console.info(`Initialized database.`);			 
});
