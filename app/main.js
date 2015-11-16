"use strict";
let React = require('react');
let ReactDOM = require('react-dom');
let post = require('./restHelper.js').post;
let get = require('./restHelper.js').get;

let userStore = require('./stores/userStore.js');

let listStore = require('./stores/listStore.js');

let TopTenList = require('./components/TopTenList.js');



let list = {items:[]};
listStore.onChange(function(_list){
	list = _list;
	render();
});

let user = userStore.getUser();
userStore.onChange((_user)=>{
	user = _user;
	if (!user) {
		list = {items:[]};		
	}
	render();
});

function render(){
	ReactDOM.render(<TopTenList user={user} list={list} />, appMount);
}
render();