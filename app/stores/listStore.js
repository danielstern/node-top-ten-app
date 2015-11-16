"use strict";
let dispatcher = require("./../dispatcher.js");
let {get,post,del,patch} = require("./../RestHelper.js");
let userStore = require('./userStore.js');

function ListStore(){

	let lists = [];
	let changeListeners = [];

	function triggerListeners(){
		changeListeners.forEach(function(listener){
			listener(lists)	;
		})
	};
	
	userStore.onChange((u)=>{
		if (u){
			get('api/list/')
			.then((data)=>{
				console.log("Got lists,",data);
				lists = data;
				triggerListeners();
			});		
		}
	})
	

	function onChange(listener){
		changeListeners.push(listener);
	}

	return {
		getLists(){return lists},
		onChange:onChange
	}
}

module.exports = new ListStore();
