"use strict";
let User = require('./models/User.js');
let TopTenList = require('./models/TopTenList.js');
let TopTenListItem = require('./models/TopTenListItem.js');

new User({username:"guest",password:"test"}).save()
.then(function(user){
	return new TopTenList({name:`Favorite Songs`,owner: user._id}).save()
})
.then(function(list){
	console.log("List created..",list);
	let initialItems = [1,2,3,4,5,6,7,8,9,10]
	.map((n)=>{return {name:`Item ${n}`, link:"http://oreilly.com", rank:n, list:list._id}})
	.forEach(function(item){
		let instance = new TopTenListItem(item)
		console.log("Created item...",instance);
		instance.save();
	});
});



console.info("Populating database");
