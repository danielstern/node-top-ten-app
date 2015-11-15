"use strict";
let mongoose = require(`mongoose`);

module.exports = mongoose.model(`TopTenListItem`,{
	name:String,
	rank:Number,
	description:String,
	link:String,
	/*list:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TopTenList'
	}*/
	list:mongoose.Schema.ObjectId
});			   
