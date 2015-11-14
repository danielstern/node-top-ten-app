"use strict";
let React = require('react');
let ReactDOM = require('react-dom');
let $ = require('jquery');
let post = require('./restHelper.js').post;

//$.ajax({
//	url:'/login',
//	type:'POST',
//	data:{username:'guest',password:'test'},
//	success:a=>console.log(a),
//	error:z=>console.warn(z)
//});

let LoginForm = React.createClass({
	handleLogin(e){
		e.preventDefault();
		console.log("Logging in?",this.state);
		post('/login',this.state)
		.then(function(g){
			console.log("Logged in?",g);
		})
	},
	getInitialState(){
		return {
			username:"guest",
			password:"test"
		}
	},
	handleNameChange(e){
		this.setState({username : e.target.value})
	},
	handlePasswordChange(e){
		this.setState({password : e.target.value})
	},
	render(){
		return (
			<form className="auth" onSubmit={this.handleLogin}>
				<h3>Please sign in to see your top ten list</h3>
				<input type="text" placeholder="Username" value={this.state.username} onChange={this.handleNameChange}/>
				<input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
				<input type="submit" value="Log In" />
			</form>
		)
	}
})

let TopTenList = React.createClass({
	render(){
		return (
			<div>
				<h1>My Top Ten List</h1>
				<LoginForm />
			</div>
		)
	}
})

ReactDOM.render(<TopTenList />, appMount);

console.info("App init");
