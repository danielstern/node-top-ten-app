"use strict";
let React = require('react');
let ReactDOM = require('react-dom');
let $ = require('jquery');

$.ajax({
	url:'/login',
	type:'POST',
	data:{username:'guest',password:'test'},
	success:a=>console.log(a),
	error:z=>console.warn(z)
});

let TopTenList = React.createClass({
	render(){
		return (
			<h1>My Top Ten List</h1>
		)
	}
})

ReactDOM.render(<TopTenList />, appMount);

console.info("App init");
