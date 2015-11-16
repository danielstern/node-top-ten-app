"use strict";
let React = require('react');
let post = require('./../restHelper.js').post;
let userActions = require('./../actions/userActionCreator.js');

module.exports = React.createClass({
	handleLogin(e){
		e.preventDefault();
		post('/login',this.state)
		.then(function(g){
			console.log("Logged in?",g);
			if (g) {
				userActions.login(g);
			}
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
				<input type="text" autoFocus="true" placeholder="Username" value={this.state.username} onChange={this.handleNameChange}/>
				<input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
				<input type="submit" value="Log In" />
			</form>
		)
	}
});