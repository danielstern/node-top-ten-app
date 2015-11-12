"use strict";
let mongoose = require(`mongoose`);

module.exports = mongoose.model(`TopTenList`, {
	name:String,
	owner:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});