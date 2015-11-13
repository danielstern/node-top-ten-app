"use strict";
let react = require('react');
let $ = require('jquery');

$.ajax({
	url:'/login',
	type:'POST',
	data:{username:'guest',password:'test'},
	success:a=>console.log(a),
	error:z=>console.warn(z)
})

console.info("App init");