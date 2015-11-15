"use strict";
let React = require('react');
let ReactDOM = require('react-dom');
let $ = require('jquery');
let post = require('./restHelper.js').post;
let get = require('./restHelper.js').get;
let userActions = require('./actions/userActionCreator.js');
let userStore = require('./stores/userStore.js');

let LoginForm = React.createClass({
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
})

let TopTenList = React.createClass({
	getDefaultProps(){
		return {
			user:null
		}
	},
	componentDidMount(){

	},
	render(){
		if (this.props.user) {

		}
		return (
			<div>
				<h1>My Top Ten List</h1>
				{this.props.user ? "Thanks for logging in" : <LoginForm />}
			</div>
		)
	}
})

let user = userStore.getUser();

userStore.onChange((_user)=>{
	user = _user;
	render();
});

function render(){
	ReactDOM.render(<TopTenList user={user} />, appMount);
}
render();


get('api/items')
.then(function(f){
	console.log(f);
})

console.info("App init");
