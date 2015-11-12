"use strict";
let mongoose = require(`mongoose`);

let User = require('./models/User.js');
let TopTenList = require('./models/TopTenList.js');
let TopTenListItem = require('./models/TopTenListItem.js');

mongoose.connect(`mongodb://localhost/grocery`,()=>{	
	mongoose.connection.db.dropDatabase();

	let initialItems = [1,2,3,4,5,6,7,8,9,10]
		.map((n)=>{return {name:`Item ${n}`, rank:n}});

	initialItems.forEach(function(item){
		new TopTenListItem(item).save();
	});

	console.info(`Initialized database.`);			 
});
