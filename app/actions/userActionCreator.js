"use strict";
let dispatcher = require("./../dispatcher.js");

module.exports = {
	login:function(user){
		dispatcher.dispatch({
			type:"user:login",
			payload:user
		})
	}
}
