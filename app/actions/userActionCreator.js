"use strict";
let dispatcher = require("./../dispatcher.js");

module.exports = {
	login:function(user){
		dispatcher.dispatch({
			type:"user:login",
			payload:user
		})
	},
	logout:function(user){
		dispatcher.dispatch({
			type:"user:logout",
			payload:user
		})
	}
}
