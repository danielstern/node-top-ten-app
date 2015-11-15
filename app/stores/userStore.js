"use strict";
let dispatcher = require("./../dispatcher.js");
let {get,post,del,patch} = require("./../RestHelper.js");

function UserStore(){

	let user = null;
	let changeListeners = [];

	function triggerListeners(){
		changeListeners.forEach(function(listener){
			listener(user)	;
		})
	};

	get('api/user')
	.then((data)=>{
		user = data;
		triggerListeners();
	});


	function logout(){
		user = null;
		triggerListeners();
	}

	function login(_user){
		console.info("Logging user in", _user);
		user = _user;
		triggerListeners();
	}

	function onChange(listener){
		changeListeners.push(listener);
	}

	this.token = dispatcher.register(function(event){
		let [category,type] = event.type.split(':');
		if (category ==='user'){
			switch(type) {
				case "login":
					login(event.payload);
					break;
				case "logout":
					logout(event.payload);
					break;
			}
		}
	})

	return {
		getUser:function(){return user},
		onChange:onChange
	}
}

module.exports = new UserStore();
