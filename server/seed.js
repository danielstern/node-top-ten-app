"use strict";
let User = require('./models/User.js');
let TopTenList = require('./models/TopTenList.js');
let TopTenListItem = require('./models/TopTenListItem.js');

let user = new User({username:"guest",password:"test"}).save();
let list = new TopTenList({name:`Favorite Songs`, owner: user._id}).save();

let initialItems = [1,2,3,4,5,6,7,8,9,10]
	.map((n)=>{return {name:`Item ${n}`, rank:n, list:list._id}})
	.forEach(function(item){
		new TopTenListItem(item).save();
	});
console.info("Populating database");